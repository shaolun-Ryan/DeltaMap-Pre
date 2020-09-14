import React, {Component} from 'react';
import $ from 'jquery'
import axios from 'axios'
import '../style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import * as d3 from 'd3'
import * as dm from 'guans-deltamap'
import { vis_mip } from '../../libs/vis_mip';
import { vis_COVID19 } from '../../libs/vis_COVID19'
import{ vis } from '../../libs/vis_example'


class DOM extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectPlot: '',
            filterAlgo: 'number',
            appendValue: 15,

            dataSource:'Example',

            hover:{},
            display: 'dec',

            initData:[],
            viewData: [],
            initData_covid:[],
            viewData_covid:[],
            initData_example:[],
            viewData_example:[],

            curArr:[],
            diff:[],
            prevArr:[],

            flagUpdate:false,
            flagAll:false,
            flagOnlyHL:false,
        }

        this.appendValueHandle = this.appendValueHandle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.dataSourceHandle = this.dataSourceHandle.bind(this)
        this.renderNBA = this.renderNBA.bind(this)
        this.renderCOVID = this.renderCOVID.bind(this)
        this.displayHandle = this.displayHandle.bind(this)
        this.selectPlotHandle = this.selectPlotHandle.bind(this)
        this.renderExample = this.renderExample.bind(this)

    }

    componentDidMount(){
        axios.get('../../static/nba_mip.json')
        .then(res=>{
            this.setState({
                initData: res.data.data,
                viewData: dm.varia(res.data.data)
            })
        })

        axios.get('../../static/covid.json')
        .then(res=>{
            this.setState({
                initData_covid: res.data.data,
                viewData_covid: dm.varia(res.data.data)
            })
        })
    
        axios.get('../../static/example.json')
        .then(res=>{
            this.setState({
                initData_example: res.data.data,
                viewData_example: dm.varia(res.data.data)
            })
        })
    }

    appendValueHandle(event){
        this.setState({appendValue: event.target.value});
    }

    dataSourceHandle(event){
        this.setState({dataSource:event.target.value});
    }

    selectPlotHandle(event){
        this.setState({selectPlot: event.target.value});
    }

    renderNBA(){
        let filter=false,display = this.state.display, data = this.state.viewData

        let svg = d3.select(`#dm-svg`)
        .attr('width', '100%')
        .attr('height', '100%')

    /*定义control panel的宽度*/
    let ctrlpnlWidth = 250

    let id = $('#system').attr("data-text");

    /*定义圆心的初始值*/
    let xo = $(`#dm-svg`).parent().width()/2
    let yo = $(`#dm-svg`).parent().height()/2
    let o = [xo,yo];


   /*
    处理传入的filter参数，来确定inner wheel的半径
    */
    let xr,yr,r;
    filter = {
        algo:'number',
        value:this.state.appendValue,
    }
    /*没有filter传入的默认情况*/
    if(filter.algo === 'number'){
        let {algo,value} = filter;
        /*link是按delta
        * 值排序后的数组*/


        let link = this.state.dataSource === 'NBA 2018-19 MIP'?
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
        /*
        * /*定义外圆和内圆的半径
        */

        xr = 0.87*yo;
        yr = xr*Math.cos(alpha>Math.PI/2?Math.PI/2:alpha);
        r = [xr,yr]
        } 

        vis_mip(svg, data, o, r,false,display)
    }

    renderCOVID(){

        let filter=false,display=this.state.display, data = this.state.viewData_covid

        let svg = d3.select(`#dm-svg`)
        .attr('width', '100%')
        .attr('height', '100%')


    /*定义圆心的初始值*/
    let xo = $(`#dm-svg`).parent().width()/2
    let yo = $(`#dm-svg`).parent().height()/2
    let o = [xo,yo];


   /*
    处理传入的filter参数，来确定inner wheel的半径
    */
    let xr,yr,r;
    filter = {
        algo:'number',
        value:this.state.appendValue,
    }
    /*没有filter传入的默认情况*/
    if(filter.algo === 'number'){
        let {algo,value} = filter;
        /*link是按delta
        * 值排序后的数组*/


        let link = this.state.dataSource === 'NBA 2018-19 MIP'?
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
        /*
        * /*定义外圆和内圆的半径
        */

        xr = 0.87*yo;
        yr = xr*Math.cos(alpha>Math.PI/2?Math.PI/2:alpha);
        r = [xr,yr]
        } 

        vis_COVID19(svg, data, o, r,this.state.selectPlot,display)
    }

    renderExample(){
        let filter=false,display = 'inc', data = this.state.viewData_example

        let svg = d3.select(`#dm-svg`)
        .attr('width', '100%')
        .attr('height', '100%')

    /*定义control panel的宽度*/
    let ctrlpnlWidth = 250

    let id = $('#system').attr("data-text");

    /*定义圆心的初始值*/
    let xo = $(`#dm-svg`).parent().width()/2
    let yo = $(`#dm-svg`).parent().height()/2
    let o = [xo,yo];


   /*
    处理传入的filter参数，来确定inner wheel的半径
    */
    let xr,yr,r;
    filter = {
        algo:'number',
        value:this.state.appendValue,
    }
    /*没有filter传入的默认情况*/
    if(filter.algo === 'number'){
        let {algo,value} = filter;
        /*link是按delta
        * 值排序后的数组*/


        let link = this.state.dataSource === 'NBA 2018-19 MIP'?
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
        /*
        * /*定义外圆和内圆的半径
        */

        xr = 0.87*yo;
        yr = xr*Math.cos(alpha>Math.PI/2?Math.PI/2:alpha);
        r = [xr,yr]
        } 

        // vis(svg, data, o,  [109.62, 92.81790671940452],false)

        vis(svg, data, o, r,false)
    }

    displayHandle(event){
        this.setState({display: event.target.value});
    }

    handleSubmit(){
        if(this.state.dataSource === 'Example'){
            this.renderExample()
        }else if(this.state.dataSource === 'NBA 2018-19 MIP'){
            this.renderNBA()
        }else if(this.state.dataSource === 'COVID-19'){
            this.renderCOVID()
        }else{
            alert('No data source input')
        }
    }

    render(){
        /*条件渲染select plot*/
        let selection;
        if(this.state.dataSource === 'NBA 2018-19 MIP'){
            selection = <option key = '0'></option>
        }else{
            selection = [false,'mask-order'].map((d,i)=>{
                return <option key={i}>{d}</option>
            })
        }


        return(
            <div className="d-flex flex-row dmsystem">
                <div className="container-left d-flex flex-column justify-content-end">

                    <div className="lab-logo">
                    
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 viewBox="-30 5 220 50" width="200" height="65">
                
                <g>
                    <line className="st0" x1="117.3" y1="38.1" x2="80.6" y2="19.8"/>
                    <line className="st1" x1="52.6" y1="24.2" x2="153.4" y2="39.5"/>
                    <circle className="st2" cx="193.6" cy="44.2" r="4"/>
                </g>
                <g>
                    <rect x="14" y="12.3" className="st3" width="176.6" height="44.4"/>
                    <path className="st2" d="M19.9,17.1h9.5c6.8,0,10.4,4.6,10.4,10.2c0,7.7-5,13.1-14.2,13.1H15L19.9,17.1z M21.2,36h4.9
                    c5.6,0,8-4.1,8-8.5c0-4-2.1-6.1-6-6.1h-3.8L21.2,36z"/>
                    <path className="st2" d="M47.5,33.1c0,0.1,0,0.3,0,0.5c0,1.9,1,3.4,3.5,3.4c2,0,2.8-0.6,3.5-1.6h5.3c-1.1,2.9-3.9,5.5-9.2,5.5
                    c-5.7,0-8.1-3.5-8.1-7.8c0-4.7,3.2-10.2,10.4-10.2c5.6,0,8.1,3.3,8.1,7.3c0,1-0.1,1.8-0.4,2.9H47.5z M56,29.8c0-0.1,0-0.2,0-0.3
                    c0-1.8-1.1-2.9-3.4-2.9c-2.4,0-3.8,1.4-4.3,3.3H56z"/>
                    <path className="st2" d="M62.5,40.4l5.2-24.6h5.1l-5.2,24.6H62.5z"/>
                    <path className="st2" d="M73.8,23.3h3l1.1-5.1H83l-1.1,5.1h3.8l-0.8,3.8h-3.8l-1.6,7.4c-0.3,1.5-0.2,2.1,1.4,2.1c0.5,0,1.4,0,1.8-0.1
                    L82,40.1c-0.9,0.3-2.1,0.4-3.3,0.4c-4,0-5.1-1.9-4.4-5.1l1.8-8.3h-3L73.8,23.3z"/>
                    <path className="st2" d="M102.5,35.8c-0.5,2.3-0.8,3.9-0.9,4.6h-5c0-0.5,0.1-1.5,0.2-2.1c-1.1,1.5-2.9,2.5-6,2.5c-4.4,0-5.8-2.8-5.8-5
                    c0-4.9,5-6,9.3-6.4c1.3-0.1,3.2-0.2,4.4-0.2l0.1-0.3c0.3-1.4-0.4-2.6-2.9-2.6c-2,0-3,0.7-3.4,1.9h-5.3c0.6-2.5,2.5-5.4,8.8-5.4
                    c7.5,0,8.5,3.6,7.7,7.1L102.5,35.8z M98,32.6c-1.2,0-2.5,0.1-3.5,0.2c-1.8,0.2-4.1,0.6-4.1,2.5c0,1,0.8,1.7,2.4,1.7
                    c2.8,0,4.5-1.3,5.2-4.2L98,32.6z"/>
                    <path className="st2" d="M138.2,31.5c0.8-4,1.9-8.2,2.6-10.8h0c-1.9,4.2-5.7,11.1-10.1,19.7h-4.8c-0.5-7.1-1.2-15.3-1.4-19.7h0
                    c-0.4,2.7-1.2,7.2-2,11.2l-1.8,8.5h-4.9l4.9-23.2h7.8c0.6,6.6,1.4,14.5,1.4,16.5h0c1.3-2.7,5.2-9.8,8.7-16.5h7.8l-4.9,23.2h-5.2
                    L138.2,31.5z"/>
                    <path className="st2" d="M163.6,35.8c-0.5,2.3-0.8,3.9-0.9,4.6h-5c0-0.5,0.1-1.5,0.2-2.1c-1.1,1.5-2.9,2.5-6,2.5c-4.4,0-5.8-2.8-5.8-5
                    c0-4.9,5-6,9.3-6.4c1.3-0.1,3.2-0.2,4.4-0.2l0.1-0.3c0.3-1.4-0.4-2.6-2.9-2.6c-2,0-3,0.7-3.4,1.9h-5.3c0.6-2.5,2.5-5.4,8.8-5.4
                    c7.5,0,8.5,3.6,7.7,7.1L163.6,35.8z M159.1,32.6c-1.2,0-2.5,0.1-3.5,0.2c-1.8,0.2-4.1,0.6-4.1,2.5c0,1,0.8,1.7,2.4,1.7
                    c2.8,0,4.5-1.3,5.2-4.2L159.1,32.6z"/>
                    <path className="st2" d="M172.6,38.6l-1.9,9h-5.1l4.1-19.3c0.5-2.3,0.8-4.1,1-4.9h5.1c0,0.4-0.1,1-0.3,2c1.3-1.4,2.8-2.5,5.8-2.5
                    c4.1,0,6.6,3.2,6.6,7.2c0,5.6-3.5,10.8-9.9,10.8C174.7,40.9,173.3,39.6,172.6,38.6z M182.4,30.6c0-2.1-0.9-3.7-3.4-3.7
                    c-2.6,0-4.5,1.8-5.1,4.9c-0.6,3.1,0.7,4.9,3.4,4.9C180.6,36.7,182.4,34.1,182.4,30.6z"/>
                </g>
            </svg>
                    </div>
                    <div className="lab--logo">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	width="300" height="150" viewBox="400 100 1620 1780" className="logo">
<g id="图层_2">
	<g>
		<g>
			<path className="sst0" d="M1388.5,216.68c1.26-0.82,2.77-1.31,4.39-1.31h67.67c1.62,0,3.13,0.48,4.39,1.31l75.77-75.77
				c-29.35-29-69.68-46.91-114.2-46.91c-44.41,0-84.65,17.82-113.98,46.7L1388.5,216.68z"/>
		</g>
		<g>
			<path className="sst1" d="M1543.37,143.6l-75.83,75.83c0.67,1.17,1.05,2.52,1.05,3.97v67.67c0,1.62-0.48,3.12-1.31,4.39l75.02,75.02
				c28.87-29.33,46.7-69.57,46.7-113.98C1589,212.64,1571.61,172.84,1543.37,143.6z"/>
		</g>
		<g>
			<path className="sst2" d="M1464.52,298.06c-1.17,0.67-2.52,1.05-3.97,1.05h-67.67c-1.45,0-2.8-0.39-3.97-1.05l-75.31,75.31
				c29.24,28.25,69.03,45.63,112.9,45.63c43.97,0,83.86-17.47,113.11-45.85L1464.52,298.06z"/>
		</g>
		<g>
			<path className="sst3" d="M1386.15,295.46c-0.82-1.26-1.31-2.77-1.31-4.39v-67.67c0-1.45,0.39-2.8,1.05-3.97l-76.05-76.05
				c-28.37,29.26-45.85,69.14-45.85,113.11c0,44.52,17.91,84.85,46.91,114.2L1386.15,295.46z"/>
		</g>
	</g>
	<g>
		<rect x="202.54" y="357.72" className="sst4" width="1122.46" height="493.38"/>
		<text transform="matrix(1 0 0 1 202.5396 683.8184)"><tspan x="0" y="0" className="sst3 sst5 sst6">G</tspan><tspan x="295.58" y="0" className="sst2 sst5 sst6">U</tspan><tspan x="570" y="0" className="sst0 sst5 sst6">A</tspan><tspan x="823.46" y="0" className="sst1 sst5 sst6">N</tspan></text>
	</g>
</g>
<g id="图层_3">
	<rect x="348.06" y="737.15" className="sst4" width="830.94" height="74.85"/>
	<text transform="matrix(1 0 0 1 348.0562 784.3447)" className="sst7 sst5 sst8 sst9">SYsstEM LABORATORY</text>
</g>
</svg>
                    </div>


                    <div className='child-1'>
                        <label className="control-label myLabel pull-left">Data Srcs</label>
                        <select className="custom-select-sm custom-select col-sm-8 pull-right" id="dataSource"
                                value={this.state.dataSource}
                                onChange={this.dataSourceHandle}
                        >
                            <option>Example</option>
                            <option>COVID-19</option>
                            <option>NBA 2018-19 MIP</option>
                        </select>
                    </div>

                    <div className='child-2'>
                        <label className="control-label myLabel pull-left">Filter algo</label>
                        <select className="custom-select-sm custom-select col-sm-8 pull-right " id="algo"
                                value={this.state.filterAlgo}
                                onChange={this.filterAlgoHandle}
                                disabled
                        >
                            <option>number</option>
                            <option>minimal value</option>
                            <option>non-interference</option>
                        </select>
                    </div>

                    <div className='child-3'>
                        <label className="control-label myLabel">Value</label>
                        <input type="text" className="form-control col-6 pull-right"
                               value={this.state.appendValue}
                               onChange={this.appendValueHandle}
                        />
                    </div>

                    <div>
                        <label className="control-label myLabel pull-left">Select plot</label>
                        <select className="custom-select-sm custom-select col-sm-8 pull-right"
                                value={this.state.selectPlot}
                                onChange={this.selectPlotHandle}
                        >
                            {selection}
                        </select>
                    </div>

                    <div onChange={this.displayHandle}>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input type="radio" value="inc" id="customRadio1" name="customRadio"
                                   className="custom-control-input" />
                            <label className="custom-control-label myText" htmlFor="customRadio1">Only for Inc</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline pull-right">
                            <input type="radio" value="dec" id="customRadio2" name="customRadio"
                                   className="custom-control-input" defaultChecked/>
                            <label className="custom-control-label myText" htmlFor="customRadio2">Only for Dec</label>
                        </div>
                    </div>

                    <button type="button" id={'update_deltamap'} onClick={this.handleSubmit}>Update DeltaMap</button>
                </div>

                {/*{{--右侧的dm视图和下方的统计--}}*/}
                <div className="container-right flex-grow-1 d-flex flex-column">


                    {/*{{-- dm视图--}}*/}
                    <div className="dm">
                        
                        <svg id="dm-svg"></svg>

                    </div>

                </div>
            </div>
        )
    }
}

export default DOM;
