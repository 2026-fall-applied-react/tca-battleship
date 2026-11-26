import { useEffect, useState } from 'react'

type Ping = { id: number; x: number; y: number }

const SonarPing: React.FC = () => {

    const [pings, setPings] = useState<Ping[]>([])

    useEffect(() => {
        const onClick = (e: MouseEvent) => {

            if (!(e.target as HTMLElement).closest('button, a'))
                 { return }

            const id = Date.now()

            setPings(prev => [...prev, { id, x: e.clientX, y: e.clientY }])
            
            setTimeout(() => setPings(prev => prev.filter(p => p.id !== id)), 600)
        }

        document.addEventListener('click', onClick)
        
        return () => document.removeEventListener('click', onClick)
    }, [])

    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-50" aria-hidden="true">

            {pings.map(p => (
                <span key={p.id} className="sonar-ring" style={{ left: p.x, top: p.y }} />

            ))}

        </div>
    )
}

export default SonarPing
