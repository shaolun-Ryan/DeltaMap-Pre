import * as dm from '../libs/guans-deltamap/deltamap.min.js';
import { vis } from '../libs/guans-deltamap/vis'
import { vis_mip } from '../libs/guans-deltamap/vis_mip'
import { vis_COVID19 } from '../libs/guans-deltamap/vis_COVID19'
import {vis_for_HL} from "../libs/guans-deltamap/vis_for_HL";
import * as d3 from 'd3';

// import updateInfo from "./parts/updateInfo";
import { updateSnCounter, getOptionSnCounter } from "./parts/updateSen";

export default function initChartDM(domId = null, data = null,add=false,filter=false,display='dec') {
    let svg = d3.select(`#${domId}`)
        .attr('width', '100%')
        .attr('height', '100%')

    /*定义control panel的宽度*/
    let ctrlpnlWidth = 250

    let id = $('#system').attr("data-text");

    /*定义圆心的初始值*/
    let xo = $(`#${domId}`).parent().width()/2-50
    let yo = $(`#${domId}`).parent().height()/2
    let o = [xo,yo]

    /*
    处理传入的filter参数，来确定inner wheel的半径
    */
    let xr,yr,r
    /*没有filter传入的默认情况*/
    if(!filter){
        /*定义外圆和内圆的半径*/
        xr = 0.87*yo;
        yr = 0.30*yo;
        r = [xr,yr]
    }else if(filter.algo === 'number'){
        let {algo,value} = filter;
        /*link是按delta
        * 值排序后的数组*/

        let link = id.match(new RegExp(/^mip/))?
            data.link.sort((a,b)=>{
                return a.delta-b.delta;
            })
            :
            data.link.sort((a,b)=>{
            return b.delta-a.delta;
            })
        // console.log('link',link)
        let thresh = link[value]
        let alpha;

        let ang1,ang2
        if(display === 'inc'){
            data.axisnodePos.forEach(d=>{
                if(d.uid === thresh.fromId){
                    ang1 = d.angle
                }
                if(d.uid === thresh.toId){
                    ang2 = d.angle
                }
            })
        }
        // console.log('axisnodePos',data.axisnodePos)
        if(display === 'dec'){
            data.axisnodeNeg.forEach(d=>{
                if(d.uid === thresh.fromId){
                    ang1 = d.angle
                }
                if(d.uid === thresh.toId){
                    ang2 = d.angle
                }
            })
        }
        alpha = ang1-ang2
        // console.log(Math.cos(Math.PI))
        /*
        * /*定义外圆和内圆的半径
        */

        xr = 0.87*yo;
        yr = xr*Math.cos(alpha>Math.PI/2?Math.PI/2:alpha);
        // yr = 0.15*xr;/*for not finished algo*/
        r = [xr,yr]
        // console.log(r)
    }


    /*设置highlight ego的数组，在vis中设置，再传入updateSnCounter()*/
    let snArr = [];
    window.snArr = snArr;


    /*根据传入的display处理数据*/
    // if(display === 'inc'){
    //     data.link = data.link.filter((value)=>{
    //         return value.delta >=0;
    //     })
    // }
    // if(display === 'dec'){
    //     data.link = data.link.filter((value)=>{
    //         return value.delta <=0;
    //     })
    // }


    /*draw the plot*/
    if(id.match(new RegExp(/^mip/))){
        vis_mip(svg, data, o, r,add,display)
    }else if(id.match(new RegExp(/^COVID19/))){
        vis_COVID19(svg, data, o, r,add,display)
    }else{
        vis(svg, data, o, r, add)
    }

    /*Add another plot to show HL ego instead of all ego*/
    let [ir] = r;
    vis_for_HL(svg, data, o, r, add)

    /*
    更新右侧的第三个示数组件
    * */
    updateSnCounter('snCounter', getOptionSnCounter(snArr))
};

