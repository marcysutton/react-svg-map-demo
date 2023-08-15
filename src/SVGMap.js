import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'

const SVGMap = () => {
    const svgRef = useRef(null)
    const cellRefs = useRef([])
    const [cellActiveIndex, setCellActiveIndex] = useState(0)
    const [cellRects, setCellRects] = useState([])

    useEffect(() => {
        cellRefs.current[cellActiveIndex].focus()
    }, [cellActiveIndex])

    useLayoutEffect(() => {
        // make sure DOM APIs are consistently available through useLayoutEffect hook
        setCellRects(cellRefs.current.map((btn, i) => getBoundingBox(btn)))
    }, [])

    const KEY_DIRECTION = {
        UP: 'ArrowUp', RIGHT: 'ArrowRight', DOWN: 'ArrowDown', LEFT: 'ArrowLeft'
    }
    const getBoundingBox = (element) => {
        const box = element.getBoundingClientRect()
        const rect = {}

        for (const prop in box) {
          rect[prop] = box[prop]
        }
      
        rect.xCenter = Math.floor((box.left + box.right) / 2)
        rect.yCenter = Math.floor((box.top + box.bottom) / 2)
      
        return rect
      }
    const blurHandler = (event) => {
        // reset when leaving the buttons
        if (!svgRef.current.contains(event.target)) {
            setCellActiveIndex(null)
        }
    }
    const keyHandler = (event) => {
        console.log(event.target)
        // if (svgRef.includes(event.target)) {
        if (event.key === KEY_DIRECTION.UP || event.key === KEY_DIRECTION.DOWN) {
            // keep page from scrolling
            event.preventDefault()
        }
        switch (event.key) {
            case KEY_DIRECTION.LEFT:
            case KEY_DIRECTION.RIGHT:
            case KEY_DIRECTION.UP:
            case KEY_DIRECTION.DOWN:
                findClosestNeighbor(event.target, event.key)
            break
        }
        // }
    }
    const mouseHandler = (event) => {

    }
    const distance = (rect1, rect2) => {
        let result = Math.sqrt(Math.pow(rect1.x - rect2.x, 2) + Math.pow(rect1.y - rect2.y, 2))
        return result
    }
    const outOfBounds = (direction, targetRect, otherRect, i) => {
        let excluded = false
        switch (direction) {
            // bail out if element is out of bounds
            case KEY_DIRECTION.LEFT:
                if (otherRect.xCenter >= targetRect.xCenter) excluded = true
            break
            case KEY_DIRECTION.UP:
                if (otherRect.yCenter >= targetRect.yCenter) excluded = true
            break
            case KEY_DIRECTION.RIGHT:
                if (otherRect.xCenter <= targetRect.xCenter) excluded = true
            break
            case KEY_DIRECTION.DOWN:
                if(otherRect.yCenter <= targetRect.yCenter) excluded = true
            break
        }
        return excluded
    }
    const findClosestNeighbor = (target, direction) => {
        const targetIndex = Number(target.dataset.cellId)
        const targetRect = cellRects && cellRects[targetIndex]

        let closestRect
        let minDistance = 10000000
        for (var i = 0; i < cellRects.length; i++) {
            let rect = cellRects[i]
            let excluded = outOfBounds(direction, targetRect, rect, i) || (i === targetIndex)
            let d = distance(targetRect, rect)
            if (!excluded) {
                if (d < minDistance) {
                    minDistance = d;
                    setCellActiveIndex(i);
                    closestRect = rect;
                }
            }
        }
    }
    return (
        <div className="svg-wrapper">  
            <svg
                aria-roledescription="Math controls"
                onBlur={blurHandler}
                onKeyDown={keyHandler}
                ref={svgRef}
                tabIndex="-1"
                version="1.1"
                viewBox="35 35 450 450"
                x="0px"
                y="0px"
            >
                <g className="cells">
                    <g
                        aria-checked={cellActiveIndex === '0' ? 'true' : 'false'}
                        aria-label="Add"
                        data-cell-id="0"
                        role="checkbox"
                        ref={el => cellRefs.current[0] = el}
                        tabIndex={cellActiveIndex === '0' ? '0' : '-1'}
                    >
                        <path d="M220,145h-65V80c0-2.761-2.239-5-5-5s-5,2.239-5,5v65H80c-2.761,0-5,2.239-5,5s2.239,5,5,5h65v65c0,2.761,2.239,5,5,5   s5-2.239,5-5v-65h65c2.761,0,5-2.239,5-5S222.761,145,220,145z"/>
                    </g>
                    <g
                        aria-checked={cellActiveIndex === '1' ? 'true' : 'false'}
                        aria-label="Subtract"
                        data-cell-id="1"
                        role="checkbox"
                        ref={el => cellRefs.current[1] = el}
                        tabIndex={cellActiveIndex === '1' ? '0' : '-1'}
                    >
                        <path d="M300,155h140c2.762,0,5-2.239,5-5s-2.238-5-5-5H300c-2.762,0-5,2.239-5,5S297.238,155,300,155z"/>
                    </g>
                    <g
                        aria-checked={cellActiveIndex === '2' ? 'true' : 'false'}
                        aria-label="Divide"
                        data-cell-id="2"
                        role="checkbox"
                        ref={el => cellRefs.current[2] = el}
                        tabIndex={cellActiveIndex === '2' ? '0' : '-1'}
                    >
                        <path d="M300,445c1.279,0,2.56-0.488,3.535-1.465l140-140c1.953-1.952,1.953-5.118,0-7.07c-1.951-1.953-5.119-1.953-7.07,0   l-140,140c-1.953,1.952-1.953,5.118,0,7.07C297.44,444.512,298.721,445,300,445z"/>
                        <path d="M320,345c13.785,0,25-11.215,25-25s-11.215-25-25-25s-25,11.215-25,25S306.215,345,320,345z M320,305   c8.271,0,15,6.729,15,15s-6.729,15-15,15s-15-6.729-15-15S311.729,305,320,305z"/>
                        <path d="M420,395c-13.785,0-25,11.215-25,25s11.215,25,25,25s25-11.215,25-25S433.785,395,420,395z M420,435   c-8.271,0-15-6.729-15-15s6.729-15,15-15s15,6.729,15,15S428.271,435,420,435z"/>
                    </g>
                    <g
                        aria-checked={cellActiveIndex === '3' ? 'true' : 'false'}
                        aria-label="Multiply"
                        data-cell-id="3"
                        role="checkbox"
                        ref={el => cellRefs.current[3] = el}
                        tabIndex={cellActiveIndex === '3' ? '0' : '-1'}
                    >
                        <path d="M223.536,296.465c-1.953-1.953-5.118-1.953-7.071,0L150,362.929l-66.464-66.464c-1.953-1.953-5.118-1.953-7.071,0   c-1.953,1.952-1.953,5.118,0,7.07L142.929,370l-66.465,66.465c-1.953,1.952-1.953,5.118,0,7.07C77.441,444.512,78.72,445,80,445   s2.559-0.488,3.536-1.465L150,377.071l66.464,66.464C217.441,444.512,218.72,445,220,445s2.559-0.488,3.536-1.465   c1.953-1.952,1.953-5.118,0-7.07L157.071,370l66.465-66.465C225.488,301.583,225.488,298.417,223.536,296.465z"/>
                    </g>
                </g>
                <g id="outline" role="presentation">
                    <path d="M480,35H260H40c-2.761,0-5,2.239-5,5v220v220c0,2.762,2.239,5,5,5h220h220c2.762,0,5-2.238,5-5V260V40   C485,37.239,482.762,35,480,35z M475,255H265V45h210V255z M45,45h210v210H45V45z M45,265h210v210H45V265z M475,475H265V265h210V475   z"/>
                </g>
            </svg>
        </div>
    )
}

export default SVGMap
