import React from 'react'
import './Canvas.css'
import rough from 'roughjs/bundled/rough.esm'

const Canvas = () => {
    // rough generator
    const generator = rough.generator()

    // Ref & State
    const canvasRef = React.useRef(null)
    const [rectangles, setRectangles] = React.useState([])
    const [lines, setLines] = React.useState([])
    const [isDrawing, setIsDrawing] = React.useState(false)

    // Drawing event handlers
    const handleMouseDown = (event) => {
        setIsDrawing(true)

        const position = canvasRef.current.getBoundingClientRect()
        const { clientX, clientY } = event
        const positionX = clientX - position.left
        const positionY = clientY - position.top
        const line = createLine(positionX, positionY, positionX, positionY)
        setLines((prevState) => [...prevState, line])
    }
    const handleMouseMove = (event) => {
        if (!isDrawing) return

        const currentLineIndex = lines.length - 1
        const { x1, y1 } = lines[currentLineIndex]
        const { clientX, clientY } = event
        const position = canvasRef.current.getBoundingClientRect()
        const positionX = clientX - position.left
        const positionY = clientY - position.top
        const updatedLine = createLine(x1, y1, positionX, positionY)

        const linesCopy = [...lines]
        linesCopy[currentLineIndex] = updatedLine
        setLines(linesCopy)
    }
    const handleMouseUp = () => {
        setIsDrawing(false)
    }

    // Function for creating a line
    const createLine = (x1, y1, x2, y2) => {
        const roughLine = generator.line(x1, y1, x2, y2, { stroke: '#5bc197' })
        return { x1, y1, x2, y2, roughLine }
    }

    // Drawing on rerender
    React.useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        const roughCanvas = rough.canvas(canvas)

        lines.forEach((line) => roughCanvas.draw(line.roughLine))

        // Convert lines to rectangle
        /*
        roughCanvas.rectangle(100, 100, 100, 100, { stroke: '#5bc197' })
        */
        // среднее между четырьмя самыми высокими и среднее между четырьмя самыми низкими для Y
        // среднее между четырьмя самыми левыми и среднее между четырьмя самыми правыми для X

        // Convert lines to rectangle
        if (lines.length && lines.length % 4 === 0 && isDrawing === false) {
            console.log('4 lines')
            const rectangle = generator.rectangle(100, 100, 100, 100, {
                stroke: '#5bc197',
            })
            setRectangles((prevState) => [...prevState, rectangle])
        }
    }, [lines, isDrawing])

    React.useEffect(() => {
        const canvas = canvasRef.current
        const roughCanvas = rough.canvas(canvas)
        rectangles.forEach((rectangle) => roughCanvas.draw(rectangle))
        console.log(rectangles.length)
    })

    return (
        <div className="Canvas">
            <canvas
                id="canvas"
                ref={canvasRef}
                width={window.innerWidth * 0.8}
                height={window.innerHeight * 0.8}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            ></canvas>
        </div>
    )
}

export default Canvas
