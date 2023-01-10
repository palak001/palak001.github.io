import React, { useEffect, useState } from "react";
import "./Flower.css";

const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_XLINK = "http://www.w3.org/1999/xlink";
const colors = [
    "#e9d985",
    "#B2BD7E",
    "#749C75",
    "#6A5D7B",
    "#5D4A66",
    "#eec0db",
    "#ca809a",
    "#e9d8e8",
];

const svg_petals_path = [
    "",
    "",
    "M25.91,-15.12 0,0 25.91,15.12L94.09,54.889 Q120,70 142.58,50.24L177.42,19.76 Q200,0 177.42,-19.756L142.58,-50.24 Q120,-70 94.087,-54.88Z",
    "M27.69,-11.54  Q0,0 27.69,11.54  L92.3,38.46  Q120,50 145.44,34.1 L174.56,15.9  Q200,0 174.56,-15.9 L145.44,-34.1 Q120,-50 92.3,-38.46Z",
    "M28.09,-10.53 Q0,0 28.09,10.53L91.91,34.47 Q120,45 146.147,30.29L173.85,14.7 Q200,0 173.85,-14.7L146.15,-30.29 Q120,-45 91.91,-34.467Z",
    "M28.85,-8.24 Q0,0 28.85,8.24L111.15,31.76 Q140,40 164.96,23.36L175.04,16.64 Q200,0 175.038,-16.64L164.96,-23.36 Q140,-40 111.15,-31.76Z",
];

const getWindowDimensions = () => {
    return { width: window.innerWidth, height: window.innerHeight };
};

const Flower = (props) => {
    const [points, setPoints] = useState([]);
    const [windowDimensions, setWindowDimensions] =
        useState(getWindowDimensions);

    const handleResize = () => {
        setWindowDimensions(getWindowDimensions);
    };

    const paint_flower = (point, n, scale) => {
        let G = document.createElementNS(SVG_NS, "g");
        let x = point.x;
        let y = point.y;
        G.setAttribute("style", `--scale=${scale};`);
        let rot = ~~(Math.random() * 180);
        G.setAttributeNS(
            null,
            "transform",
            `translate(${x}, ${y}) rotate(${rot})`
        );
        let color = colors[~~(Math.random() * colors.length)];
        G.setAttributeNS(null, "fill", color);
        let ga = document.createElementNS(SVG_NS, "g");
        ga.setAttribute("class", "a");

        for (let i = 0; i < 2; i++) {
            // left, right
            let g = document.createElementNS(SVG_NS, "g");
            g.setAttribute("class", "b");
            for (let j = 0; j < n; j++) {
                if (n <= svg_petals_path.length) {
                    var path = document.createElementNS(SVG_NS, "path");
                    path.setAttribute("d", svg_petals_path[n]);
                    g.appendChild(path);
                }
            }
            ga.appendChild(g);
        }
        G.appendChild(ga);

        if (props.value == "flower-top-svg-container")
            document.getElementById("svg").appendChild(G);
        else if (props.value == "flower-bottom-svg-container")
            document.getElementById("svg_bottom").appendChild(G);
        setTimeout(() => {
            G.setAttribute("class", `_${n}`);
        }, 3);
    };

    // frames
    let frames = 0;
    const Frame = () => {
        let rid = window.requestAnimationFrame(Frame);
        if (frames >= points.length) {
            window.cancelAnimationFrame(rid);
            rid = null;
        }
        let point = points[frames];
        let n = 2 + ~~(Math.random() * 4);
        let scale = ~~(Math.random() * 6) + 25;
        paint_flower(point, n, scale);
        frames++;
    };

    // Initialize points array
    const init_points = () => {
        let x = 0;
        let y = 0;
        let new_points = [];
        for (let a = 0; a < 10000; a += 400) {
            x = a;
            y = 4300 + 550 * Math.sin(a);
            new_points.push({ x: x, y: y });
        }
        setPoints((prev_points) => [...prev_points, ...new_points]);
    };

    useEffect(() => {
        if (points.length > 0) {
            Frame();
        }
    }, [points]);

    useEffect(() => {}, [windowDimensions]);

    useEffect(() => {
        if (points.length <= 0) {
            init_points();
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (props.value != undefined) {
        return (
            <div className={`${props.value}`}>
                {props.value == "flower-top-svg-container" ? (
                    <svg
                        viewBox="-1250 800 9000 9000"
                        className="svg"
                        id="svg"
                        preserveAspectRatio="xMidYMid slice"
                        fill="#211f22"
                    >
                        <defs>
                            <filter
                                id="f"
                                width="1000"
                                height="1000"
                                x="-200"
                                y="-200"
                            >
                                <feGaussianBlur
                                    in="SourceAlpha"
                                    stdDeviation="100"
                                    result="blur"
                                ></feGaussianBlur>
                                <feComposite
                                    in="color"
                                    in2="blur"
                                    operator="in"
                                    result="shadow"
                                />
                                <feOffset
                                    in="shadow"
                                    dx="80"
                                    dy="80"
                                    result="offset"
                                ></feOffset>
                                <feMerge>
                                    <feMergeNode in="offset" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <g class="svg_top_g" id="svg_top_g"></g>
                    </svg>
                ) : (
                    <svg
                        viewBox="-1250 -1000 9000 9000"
                        className="svg_bottom"
                        id="svg_bottom"
                        preserveAspectRatio="xMidYMid slice"
                        fill="#211f22"
                    >
                        <defs>
                            <filter
                                id="f"
                                width="1000"
                                height="1000"
                                x="-500"
                                y="-500"
                            >
                                <feGaussianBlur
                                    in="SourceAlpha"
                                    stdDeviation="100"
                                    result="blur"
                                ></feGaussianBlur>
                                <feComposite
                                    in="color"
                                    in2="blur"
                                    operator="in"
                                    result="shadow"
                                />
                                <feOffset
                                    in="shadow"
                                    dx="100"
                                    dy="100"
                                    result="offset"
                                ></feOffset>
                                <feMerge>
                                    <feMergeNode in="offset" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <g class="svg_bottom_g" id="svg_bottom_g"></g>
                    </svg>
                )}
            </div>
        );
    }
};

export default Flower;
