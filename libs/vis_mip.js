/*
This is the method inherited from the format.js
To comvert formatted data into svg plot.`
*/
/*
@params Array data
@params Array cirlce center coordinates
@params Array Outer and inner radius
@params String The params tto controls the color map of the stroke

@return null
*/
import * as d3 from 'd3';
import { select } from 'd3-selection'
import {playerMap} from './presets/player_map_color.js'

let getExtentFromOutput = (data)=>{
    let [min,max] = d3.extent(data.link.reduce((prev,cur)=>{
        prev.push(cur.from, cur.to)
        return prev
    },[]))

    return [min, max];
};

let vis_mip = (svg, data, c=[], r=[], add=false,display='dec')=>{
    /*
    Customize error message.

    
    */
    if(!svg){
        throw("The svg ele to inject is not found. Expected DOM element from d3.selection.");
    }
    if(!data){
        throw('The data to be rendered is not defined. Expected Array "varia()"');
    }

    if(c.length==0){
        throw('The coordinate of dm circle is not defined. Expected Array [x0, y0].');
    }

    if(r.length==0){
        throw('Radius of dm is not defined. Expected Array [outerRadius, innerRadius].');
    }

    if(r[0]<=r[1]){
        throw('Parsing error. Expected Array [outerRadius, innerRadius].');
    }

    /* 创建add解析函数 */
    //实现两种颜色区域的渐变
    // let addColor, colorAsc, colorDec, acs, dec;
    // if(typeof data.link[0][add] == 'number'){
    //     //TODO:定制渐变的颜色映射
    //     addColor = d3.scaleSequential(d3.interpolateLab("#d9eaf7", "#1B9CFC"))
    //         .domain(d3.extent(data.link.reduce((prev,cur)=>{
    //             prev.push(cur[add])
    //             return prev;
    //         },[])));
    // }
    // if(!add){
    //     acs = data.link.reduce((prev,cur)=>{
    //         if(cur.delta>=0){
    //             prev.push(cur.delta)
    //             return prev;
    //         }
    //         return prev;
    //     },[])
    //     dec = data.link.reduce((prev,cur)=>{
    //         if(cur.delta<0){
    //             prev.push(cur.delta)
    //             return prev;
    //         }
    //         return prev;
    //     },[])
    //
    //     if(acs.length>2&&dec.length>2){
    //         //TODO:定制无附加属性的颜色映射
    //         colorAsc = d3.scaleSequential(d3.interpolateLab("#b5ffc2", "#278f39"))
    //             .domain(d3.extent(acs));
    //         colorDec = d3.scaleSequential(d3.interpolateLab("#fdb1a7", "#d72a13"))
    //             .domain(d3.extent(dec));
    //     }else if(acs.length>1&&dec.length===2){
    //         colorAsc = d3.scaleSequential(d3.interpolateLab("#b5ffc2", "#278f39"))
    //             .domain(d3.extent(acs));
    //         colorDec=function(){
    //             return '#d72a13';
    //         };
    //     }else if(dec.length>1&&acs.length===2){
    //         colorAsc = ()=>{
    //             return '#278f39';
    //         };
    //         colorDec = d3.scaleSequential(d3.interpolateLab("#fdb1a7", "#d72a13"))
    //             .domain(d3.extent(dec));
    //     }
    // }
    // function colorMap(d){
    //     /* add参数没有指定时 */
    //     if(!add){
    //
    //         return d.delta>=0? colorAsc(d.delta) : colorDec(d.delta);
    //         /* add参数指定为数值型时 */
    //         //TODO:定制add为布尔值时的颜色映射
    //     }else if(typeof data.link[0][add] == 'boolean'){
    //         return d.add == true?'#2d3436':'#b2bec3';
    //         /* add参数指定为布尔型时 */
    //     }else if(typeof data.link[0][add] == 'number'){
    //         return addColor(d.add)
    //     }
    // }


    const outerRadius = r[0], innerRadius = r[1];
    const max = getExtentFromOutput(data)[1], min = getExtentFromOutput(data)[0]

    svg
        .selectAll('*')
        .remove()

    /* 创建包含dm的g，并且移动到指定位置 */
    svg = svg.append('g')
        .attr('id','showAll')
        .attr('transform', `translate(${c[0]},${c[1]})`)

        
    //定义tooltip的selection
    let div = d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);



    //定义环形的映射比例尺
    let scale = d3.scaleLinear()
        .domain([min, max])
        .range([Math.PI, 0])

    //用于绘制左半圆的刻度
    let scale2 = d3.scaleLinear()
        .domain([min,max])
        .range([-Math.PI, 0])

    //画放射的标识虚线
    let radialLine = d3.radialLine()
        .angle(d=>d.angle)
        .radius(d=>d.radius);

    let strokeDataForPolarAxis;

    if(display === 'inc'){
        strokeDataForPolarAxis = data.axisnodePos.map((d,i)=>{
            return d.tick%10 == 0 ||d.uid == 0 ||d.uid == data.axisnodePos.length?
                [
                    {
                        angle: 0,
                        radius: 0
                    },
                    {
                        angle: d.angle,
                        radius: outerRadius
                    }
                ]:[ ];
        })

        svg.append('g')
            .selectAll('.radial-stroke')
            .data(strokeDataForPolarAxis)
            .enter()
            .append('path')
            .attr('class', 'radial-stroke')
            .attr('d', radialLine)
    }

    //Neg
    if(display === 'dec'){
        strokeDataForPolarAxis = data.axisnodeNeg.map((d,i)=>{
            return d.tick%10 == 0 ||d.uid == 0 ||d.uid == data.axisnodeNeg.length?
                [
                    {
                        angle: 0,
                        radius: 0
                    },
                    {
                        angle: d.angle,
                        radius: outerRadius
                    }
                ]:[ ];
        })

        svg.append('g')
            .selectAll('.radial-stroke')
            .data(strokeDataForPolarAxis)
            .enter()
            .append('path')
            .attr('class', 'radial-stroke')
            .attr('d', radialLine)
    }

    //画outer环形坐标的圆
    svg.append('g')
        .attr('class', 'axis-outer')
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(outerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2*Math.PI)
        )

    //画inner环形坐标的圆
    let innerCircle = svg.append('g')
        .attr('class', 'axis-inner')
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(innerRadius)
            .outerRadius(innerRadius)
            .startAngle(0)
            .endAngle(2*Math.PI))

    //绘制inner坐标上的刻度
    let xAxisInnerPos = svg.append("g");
    //Pos
    var xTickPos = xAxisInnerPos
        .selectAll("g")
        .data(scale.ticks(20))
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "rotate(" + ((scale(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
        });

    xTickPos
        .append("line")
        .attr("x2", (d,i)=>{
            return d%20 == 0 ||d == 0 ||d == 150? 7:4;
        })
        .attr("stroke", "rgb(82, 79, 79)")
        .attr('stroke-width', d=>{
            return d%20 == 0 ||d == 0 ||d == 150? 2:1;
        })

    //Neg
    let xAxisInnerNeg = svg.append("g");
    var xTickNeg = xAxisInnerNeg
        .selectAll("g")
        .data(scale2.ticks(20))
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "rotate(" + ((scale2(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
        });

    xTickNeg.append("line")
        .attr("x2", (d,i)=>{
            return d%20 == 0 ||d == 0 ||d == 150? 7:4;
        })
        .attr("stroke", "rgb(82, 79, 79)")
        .attr('stroke-width', d=>{
            return d%20 == 0 ||d == 0 ||d == 150? 2:1;
        })


    // //绘制outer坐标上的刻度
    //Pos
    let xAxisOuterPos = svg.append("g");

    let xOuterTickPos = xAxisOuterPos
        .selectAll("g")
        .data(scale.ticks(max-min))//算出总tick数
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "rotate(" + ((scale(d)) * 180 / Math.PI - 90) + ")translate(" + outerRadius + ",0)";
        });

    xOuterTickPos.append("line")
        .attr("x2", (d,i)=>{
            return d%20 == 0 ||d == 0 ||d == 150? 7:4;
        })
        .attr("stroke", "rgb(82, 79, 79)")
        .attr('stroke-width', d=>{
            return d%20 == 0 ||d == 0 ||d == 150? 2:1;
        });

    xOuterTickPos.append("text")
        .attr("transform", function(d) {
            var angle = scale(d);
            return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,-14)" : "rotate(-90)translate(0, 18)";
        })
        .text(function(d) {
            return d==max||d==min?d:(d%20==0?d:null)
        })
        .style("font-size", 12)
        .style('font-weight', 500)

    let xAxisOuterNeg = svg.append("g");

    let xOuterTickNeg = xAxisOuterNeg
        .selectAll("g")
        .data(scale2.ticks(max-min))//算出总tick数
        .enter().append("g")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "rotate(" + ((scale2(d)) * 180 / Math.PI - 90) + ")translate(" + outerRadius + ",0)";
        });

    xOuterTickNeg.append("line")
        .attr("x2", (d,i)=>{
            return d%20 == 0 ||d == 0 ||d == 150? 7:4;
        })
        .attr("stroke", "rgb(82, 79, 79)")
        .attr('stroke-width', d=>{
            return d%20 == 0 ||d == 0 ||d == 150? 2:1;
        });

    xOuterTickNeg.append("text")
        .attr("transform", function(d) {
            var angle = scale(d);
            return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,-14)" : "rotate(-90)translate(0, 18)";
        })
        .text(function(d) {
            return d==max||d==min?d:(d%20==0?d:null)
        })
        .style("font-size", 12)
        .style('font-weight', 500)

    //定义tooltip的selection
    // let div = select('body')
    //     .append('div')
    //     .attr('class', 'tooltip')
    //     .style('opacity', 0);

    //计算切线长度，来判断线段的交点个数
    let tangent = Math.sqrt(outerRadius*outerRadius-innerRadius*innerRadius)
    let intersectCounter = 0

    //绘制axis之间的link
    let dataForRadialLine = data.link.map((d,i)=>{
        return d.delta>=0?
            [{
                uid: d.uid,
                name: d.name,
                fromId: d.fromId,
                toId: d.toId,
                from: d.from,
                to: d.to,
                delta: d.delta,
                add: d[add],
                angle:data.axisnodePos[d.fromId].angle,
                radius: outerRadius
            },{
                // uid: d.uid,
                // name: d.name,
                // fromId: d.fromId,
                // toId: d.toId,
                // fromGrade: d.fromGrade,
                // toGrade: d.toGrade,
                // delta: d.delta,
                angle:data.axisnodePos[d.toId].angle,
                radius: innerRadius
            }]
            :
            [{
                uid: d.uid,
                name: d.name,
                fromId: d.fromId,
                toId: d.toId,
                from: d.from,
                to: d.to,
                delta: d.delta,
                add: d[add],
                angle:data.axisnodeNeg[d.fromId].angle,
                radius: outerRadius
            },{
                // uid: d.uid,
                // name: d.name,
                // fromId: d.fromId,
                // toId: d.toId,
                // fromGrade: d.fromGrade,
                // toGrade: d.toGrade,
                // delta: d.delta,
                angle:data.axisnodeNeg[d.toId].angle,
                radius: innerRadius
            }]
    })
    /*接受highlight ego的数组*/
    // let snArr = []

    let links = svg.append('g')
        .selectAll('.link')
        .data(dataForRadialLine)
        .enter()
        .append('path')
        .attr('class', 'link')
        .attr('d', radialLine)
        .attr('stroke', d => {
            let name = d[0].name
            let color;
            playerMap.forEach((item,i)=>{
                if(item.player === name){
                    color = item.color;
                }
            })
            if(display === 'dec'){
                return d[0].delta<=0?color:'grey';
            }
            if(display === 'inc'){
                return d[0].delta>=0?color:'grey';
            }
        })
        .each(d=>{
            if(Math.sqrt(Math.pow(d[0].radius,2)+(Math.pow(d[1].radius,2))-2*d[0].radius*d[1].radius*Math.cos(d[0].angle-d[1].angle))>tangent){
                // intersectCounter++;
                // snArr.push(d)
            }
        })
        .on('mouseover', mouseover)
        .on("mouseout", mouseout)

    window.links = links
    // document.getElementById('counterid').innerHTML =intersectCounter


    //画D区域的link
    let clip = svg.append('defs')
        .append('clipPath')
        .attr('id', 'clip')
        .append('circle')
        .attr('r', innerRadius-1.5)

    let links_d = svg.append('g')
        .attr('clip-path', 'url(#clip)')
        .selectAll('.link-d')
        .data(dataForRadialLine)
        .enter()
        .append('path')
        .attr('class', 'link-d')
        .attr('d', radialLine)
        .on('mouseover', mouseover_d)
        .on("mouseout", mouseout_d)
        .attr('stroke', d => {
            let name = d[0].name
            let color;
            playerMap.forEach((item,i)=>{
                if(item.player === name){
                    color = item.color;
                }
            })
            if(display === 'dec'){
                return d[0].delta<=0?color:'';
            }
            if(display === 'inc'){
                return d[0].delta>=0?color:'';
            }
        })
        // .attr('stroke-width', 5.5)

    window.links_d = links_d

    //画分割线
    let separation = svg
        .append('line')
        .attr('x1',0)
        .attr('x2',0)
        .attr('y1',-outerRadius)
        .attr('y2',outerRadius)
        .attr('stroke','rgb(82, 79, 79)')
        .attr('stroke-width','1px')
        .attr('stroke-dasharray', '6,3')


    //交互：tooltip  mouseover
    function mouseover(d,i){
        console.log('hover')
        select('#tooltip')
            // .transition()
            // .duration(170)
            .style('opacity', 0.9);
        select('#tooltip')
        .html(`Name: ${d[0].name}</br>Period One: ${d[0].from}</br>Period Two: ${d[0].to}</br>delta: ${d[0].delta}`)
            .style('left', (event.offsetX+450) + "px")
            .style("top", (event.offsetY) + "px");
        // links_d.style('display', 'none')
    }

    function mouseout(d,i){
        select('#tooltip')
            // .transition()
            // .duration(500)
            .style("opacity", 0);
        links_d.style('display', 'block')
    }

    function mouseover_d(d,i){
        select('#tooltip')
            // .transition()
            // .duration(170)
            .style('opacity', 0.9);
        select('#tooltip')
            .html(`Name: ${d[0].name}</br>Period One: ${d[0].from}</br>Period Two: ${d[0].to}</br>delta: ${d[0].delta}`)
            .style('left', (event.offsetX+450) + "px")
            .style("top", (event.offsetY) + "px");
        // links_d.style('display', 'none')
            clip.attr('r', outerRadius)
    }

    function mouseout_d(d,i){
        select('#tooltip')
            // .transition()
            // .duration(500)
            .style("opacity", 0);
        links_d.style('display', 'block')
        clip.attr('r', innerRadius)
    }

    //打造vis的接口，允许user在外部可更改
    return {
        links: links,
        links_d: links_d
    };
}


export {
    vis_mip
}
