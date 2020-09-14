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
        let nba_mip = {
            "code": 200,
            "data": [
              {
                "player": "James Harden",
                "pts18": 1,
                "pts19": 1
              },
              {
                "player": "Paul George",
                "pts18": 21,
                "pts19": 2
              },
              {
                "player": "Giannis Antetokounmpo",
                "pts18": 5,
                "pts19": 3
              },
              {
                "player": "Joel Embiid",
                "pts18": 15,
                "pts19": 4
              },
              {
                "player": "LeBron James",
                "pts18": 3,
                "pts19": 5
              },
              {
                "player": "Stephen Curry",
                "pts18": 6,
                "pts19": 6
              },
              {
                "player": "Devin Booker",
                "pts18": 10,
                "pts19": 8
              },
              {
                "player": "Kevin Durant",
                "pts18": 7,
                "pts19": 9
              },
              {
                "player": "Anthony Davis",
                "pts18": 2,
                "pts19": 10
              },
              {
                "player": "Damian Lillard",
                "pts18": 4,
                "pts19": 11
              },
              {
                "player": "Kemba Walker",
                "pts18": 20,
                "pts19": 12
              },
              {
                "player": "Bradley Beal",
                "pts18": 17,
                "pts19": 13
              },
              {
                "player": "Blake Griffin",
                "pts18": 22,
                "pts19": 14
              },
              {
                "player": "Karl-Anthony Towns",
                "pts18": 24,
                "pts19": 15
              },
              {
                "player": "Kyrie Irving",
                "pts18": 11,
                "pts19": 16
              },
              {
                "player": "Donovan Mitchell",
                "pts18": 25,
                "pts19": 17
              },
              {
                "player": "Zach LaVine",
                "pts18": 51,
                "pts19": 18
              },
              {
                "player": "Russell Westbrook",
                "pts18": 8,
                "pts19": 19
              },
              {
                "player": "Klay Thompson",
                "pts18": 28,
                "pts19": 20
              },
              {
                "player": "Julius Randle",
                "pts18": 58,
                "pts19": 21
              },
              {
                "player": "LaMarcus Aldridge",
                "pts18": 12,
                "pts19": 22
              },
              {
                "player": "DeMar DeRozan",
                "pts18": 14,
                "pts19": 23
              },
              {
                "player": "Jrue Holiday",
                "pts18": 33,
                "pts19": 25
              },
              {
                "player": "D'Angelo Russell",
                "pts18": 64,
                "pts19": 26
              },
              {
                "player": "Mike Conley",
                "pts18": 50,
                "pts19": 27
              },
              {
                "player": "CJ McCollum",
                "pts18": 23,
                "pts19": 28
              },
              {
                "player": "Nikola Vucevic",
                "pts18": 54,
                "pts19": 29
              },
              {
                "player": "John Wall",
                "pts18": 30,
                "pts19": 30
              },
              {
                "player": "Buddy Hield",
                "pts18": 94,
                "pts19": 31
              },
              {
                "player": "Nikola Jokic",
                "pts18": 37,
                "pts19": 32
              },
              {
                "player": "Tobias Harris",
                "pts18": 36,
                "pts19": 33
              },
              {
                "player": "Lou Williams",
                "pts18": 18,
                "pts19": 35
              },
              {
                "player": "Danilo Gallinari",
                "pts18": 65,
                "pts19": 36
              },
              {
                "player": "John Collins",
                "pts18": 160,
                "pts19": 37
              },
              {
                "player": "Victor Oladipo",
                "pts18": 12,
                "pts19": 39
              },
              {
                "player": "Lauri Markkanen",
                "pts18": 66,
                "pts19": 40
              },
              {
                "player": "Jimmy Butler",
                "pts18": 19,
                "pts19": 41
              },
              {
                "player": "Kyle Kuzma",
                "pts18": 59,
                "pts19": 42
              },
              {
                "player": "Khris Middleton",
                "pts18": 26,
                "pts19": 43
              },
              {
                "player": "Brandon Ingram",
                "pts18": 60,
                "pts19": 44
              },
              {
                "player": "Jamal Murray",
                "pts18": 52,
                "pts19": 45
              },
              {
                "player": "Andrew WigginsMIN",
                "pts18": 42,
                "pts19": 46
              },
              {
                "player": "Tim Hardaway Jr.",
                "pts18": 45,
                "pts19": 47
              },
              {
                "player": "JJ Redick",
                "pts18": 49,
                "pts19": 48
              },
              {
                "player": "Derrick Rose",
                "pts18": 214,
                "pts19": 49
              },
              {
                "player": "T.J. Warren",
                "pts18": 29,
                "pts19": 50
              },
              {
                "player": "Bojan Bogdanovic",
                "pts18": 80,
                "pts19": 51
              },
              {
                "player": "Andre Drummond",
                "pts18": 70,
                "pts19": 52
              },
              {
                "player": "De'Aaron Fox",
                "pts18": 141,
                "pts19": 53
              },
              {
                "player": "Kevin Love",
                "pts18": 44,
                "pts19": 54
              },
              {
                "player": "Pascal Siakam",
                "pts18": 249,
                "pts19": 56
              },
              {
                "player": "Ben Simmons",
                "pts18": 61,
                "pts19": 57
              },
              {
                "player": "Jordan Clarkson",
                "pts18": 90,
                "pts19": 58
              },
              {
                "player": "Spencer Dinwiddie",
                "pts18": 118,
                "pts19": 59
              },
              {
                "player": "Clint Capela",
                "pts18": 91,
                "pts19": 61
              },
              {
                "player": "Montrezl Harrell",
                "pts18": 152,
                "pts19": 62
              },
              {
                "player": "Josh Richardson",
                "pts18": 106,
                "pts19": 63
              },
              {
                "player": "Harrison Barnes",
                "pts18": 34,
                "pts19": 64
              },
              {
                "player": "DeMarcus Cousins",
                "pts18": 9,
                "pts19": 66
              },
              {
                "player": "Eric Gordon",
                "pts18": 38,
                "pts19": 67
              },
              {
                "player": "Aaron Gordon",
                "pts18": 43,
                "pts19": 68
              },
              {
                "player": "Eric Bledsoe",
                "pts18": 41,
                "pts19": 69
              },
              {
                "player": "Rudy Gobert",
                "pts18": 93,
                "pts19": 70
              },
              {
                "player": "Jayson Tatum",
                "pts18": 88,
                "pts19": 71
              },
              {
                "player": "Malcolm Brogdon",
                "pts18": 103,
                "pts19": 72
              },
              {
                "player": "Jusuf Nurkic",
                "pts18": 78,
                "pts19": 73
              },
              {
                "player": "Chris Paul",
                "pts18": 35,
                "pts19": 74
              },
              {
                "player": "Jonas Valanciunas",
                "pts18": 113,
                "pts19": 75
              },
              {
                "player": "Dennis Schroder",
                "pts18": 32,
                "pts19": 76
              },
              {
                "player": "Reggie Jackson",
                "pts18": 75,
                "pts19": 77
              },
              {
                "player": "Jeremy Lamb",
                "pts18": 105,
                "pts19": 78
              },
              {
                "player": "Kelly Oubre Jr.",
                "pts18": 134,
                "pts19": 79
              },
              {
                "player": "Nikola Mirotic",
                "pts18": 63,
                "pts19": 80
              },
              {
                "player": "Evan Fournier",
                "pts18": 40,
                "pts19": 81
              },
              {
                "player": "Terrence Ross",
                "pts18": 198,
                "pts19": 82
              },
              {
                "player": "Dwyane Wade",
                "pts18": 146,
                "pts19": 83
              },
              {
                "player": "Serge Ibaka",
                "pts18": 115,
                "pts19": 84
              },
              {
                "player": "Emmanuel Mudiay",
                "pts18": 202,
                "pts19": 86
              },
              {
                "player": "Jabari Parker",
                "pts18": 116,
                "pts19": 87
              },
              {
                "player": "Kyle Lowry",
                "pts18": 55,
                "pts19": 89
              },
              {
                "player": "Bobby Portis",
                "pts18": 98,
                "pts19": 90
              },
              {
                "player": "Bogdan Bogdanovic",
                "pts18": 135,
                "pts19": 91
              },
              {
                "player": "Domantas Sabonis",
                "pts18": 138,
                "pts19": 92
              },
              {
                "player": "Marcus Morris Sr.",
                "pts18": 92,
                "pts19": 93
              },
              {
                "player": "Otto Porter Jr.",
                "pts18": 71,
                "pts19": 94
              },
              {
                "player": "Steven Adams",
                "pts18": 89,
                "pts19": 95
              },
              {
                "player": "Goran Dragic",
                "pts18": 47,
                "pts19": 97
              },
              {
                "player": "Rudy Gay",
                "pts18": 143,
                "pts19": 98
              },
              {
                "player": "Joe Harris",
                "pts18": 156,
                "pts19": 99
              },
              {
                "player": "Caris LeVert",
                "pts18": 127,
                "pts19": 100
              }
            ]
          }
          this.setState({
                    initData:nba_mip.data,
                    viewData: dm.varia(nba_mip.data)
                })
        // axios.get('/static/nba_mip.json')
        // .then(res=>{
        //     this.setState({
        //         initData: res.data.data,
        //         viewData: dm.varia(res.data.data)
        //     })
        // })
        let covid = {
            "code": 200,
            "data": [
              {
                "State": "Alabama",
                "Before_per_Million": 131,
                "After_per_Million": 152,
                "Party": "Republican Party",
                "Population": 4903185,
                "Before": 644,
                "After": 745
              },
              {
                "State": "Alaska",
                "Before_per_Million": 19,
                "After_per_Million": 27,
                "Party": "Republican Party",
                "Population": 731545,
                "Before": 14,
                "After": 20
              },
              {
                "State": "Arizona",
                "Before_per_Million": 302,
                "After_per_Million": 379,
                "Party": "Republican Party",
                "Population": 7278717,
                "Before": 2200,
                "After": 2760
              },
              {
                "State": "Arkansas",
                "Before_per_Million": 112,
                "After_per_Million": 214,
                "Party": "Republican Party",
                "Population": 3017804,
                "Before": 337,
                "After": 645
              },
              {
                "State": "California",
                "Before_per_Million": 96,
                "After_per_Million": 124,
                "Party": "Democratic Party",
                "Population": 39512223,
                "Before": 3802,
                "After": 4889
              },
              {
                "State": "Colorado",
                "Before_per_Million": 35,
                "After_per_Million": 50,
                "Party": "Democratic Party",
                "Population": 5758736,
                "Before": 200,
                "After": 289
              },
              {
                "State": "Connecticut",
                "Before_per_Million": 19,
                "After_per_Million": 27,
                "Party": "Democratic Party",
                "Population": 3565287,
                "Before": 68,
                "After": 97
              },
              {
                "State": "Delaware",
                "Before_per_Million": 54,
                "After_per_Million": 69,
                "Party": "Democratic Party",
                "Population": 973764,
                "Before": 53,
                "After": 67
              },
              {
                "State": "Florida",
                "Before_per_Million": 111,
                "After_per_Million": 365,
                "Party": "Unclear",
                "Population": 21477737,
                "Before": 2383,
                "After": 7843
              },
              {
                "State": "Georgia",
                "Before_per_Million": 74,
                "After_per_Million": 176,
                "Party": "Republican Party",
                "Population": 10617423,
                "Before": 783,
                "After": 1868
              },
              {
                "State": "Hawaii",
                "Before_per_Million": 4,
                "After_per_Million": 11,
                "Party": "Democratic Party",
                "Population": 1415872,
                "Before": 5,
                "After": 16
              },
              {
                "State": "Idaho",
                "Before_per_Million": 64,
                "After_per_Million": 114,
                "Party": "Republican Party",
                "Population": 1787065,
                "Before": 114,
                "After": 203
              },
              {
                "State": "Illinois",
                "Before_per_Million": 46,
                "After_per_Million": 67,
                "Party": "Democratic Party",
                "Population": 12671821,
                "Before": 587,
                "After": 845
              },
              {
                "State": "Indiana",
                "Before_per_Million": 50,
                "After_per_Million": 63,
                "Party": "Republican Party",
                "Population": 6732219,
                "Before": 336,
                "After": 425
              },
              {
                "State": "Iowa",
                "Before_per_Million": 56,
                "After_per_Million": 121,
                "Party": "Unclear",
                "Population": 3155070,
                "Before": 178,
                "After": 382
              },
              {
                "State": "Kansas",
                "Before_per_Million": 49,
                "After_per_Million": 84,
                "Party": "Republican Party",
                "Population": 2913314,
                "Before": 144,
                "After": 246
              },
              {
                "State": "Kentucky",
                "Before_per_Million": 15,
                "After_per_Million": 46,
                "Party": "Republican Party",
                "Population": 4467673,
                "Before": 67,
                "After": 205
              },
              {
                "State": "Lousiana",
                "Before_per_Million": 102,
                "After_per_Million": 202,
                "Party": "Republican Party",
                "Population": 4648794,
                "Before": 474,
                "After": 940
              },
              {
                "State": "Maine",
                "Before_per_Million": 16,
                "After_per_Million": 29,
                "Party": "Democratic Party",
                "Population": 1344212,
                "Before": 22,
                "After": 39
              },
              {
                "State": "Maryland",
                "Before_per_Million": 66,
                "After_per_Million": 55,
                "Party": "Democratic Party",
                "Population": 6045680,
                "Before": 399,
                "After": 333
              },
              {
                "State": "Massachusetts",
                "Before_per_Million": 35,
                "After_per_Million": 40,
                "Party": "Democratic Party",
                "Population": 6892503,
                "Before": 244,
                "After": 276
              },
              {
                "State": "Michigan",
                "Before_per_Million": 24,
                "After_per_Million": 30,
                "Party": "Democratic Party",
                "Population": 9986857,
                "Before": 237,
                "After": 298
              },
              {
                "State": "Minnesota",
                "Before_per_Million": 49,
                "After_per_Million": 75,
                "Party": "Democratic Party",
                "Population": 5639632,
                "Before": 275,
                "After": 423
              },
              {
                "State": "Mississippi",
                "Before_per_Million": 79,
                "After_per_Million": 236,
                "Party": "Republican Party",
                "Population": 2976149,
                "Before": 236,
                "After": 702
              },
              {
                "State": "Missouri",
                "Before_per_Million": 41,
                "After_per_Million": 66,
                "Party": "Republican Party",
                "Population": 6137428,
                "Before": 253,
                "After": 403
              },
              {
                "State": "Montana",
                "Before_per_Million": 14,
                "After_per_Million": 19,
                "Party": "Republican Party",
                "Population": 1068778,
                "Before": 15,
                "After": 20
              },
              {
                "State": "Nebraska",
                "Before_per_Million": 97,
                "After_per_Million": 95,
                "Party": "Republican Party",
                "Population": 1934408,
                "Before": 187,
                "After": 184
              },
              {
                "State": "Nevada",
                "Before_per_Million": 92,
                "After_per_Million": 214,
                "Party": "Democratic Party",
                "Population": 3080156,
                "Before": 284,
                "After": 659
              },
              {
                "State": "New Hampshire",
                "Before_per_Million": 26,
                "After_per_Million": 19,
                "Party": "Democratic Party",
                "Population": 1359711,
                "Before": 35,
                "After": 26
              },
              {
                "State": "New Jersey",
                "Before_per_Million": 31,
                "After_per_Million": 37,
                "Party": "Democratic Party",
                "Population": 8882190,
                "Before": 274,
                "After": 327
              },
              {
                "State": "New Mexico",
                "Before_per_Million": 49,
                "After_per_Million": 98,
                "Party": "Democratic Party",
                "Population": 2096829,
                "Before": 102,
                "After": 205
              },
              {
                "State": "New York",
                "Before_per_Million": 31,
                "After_per_Million": 37,
                "Party": "Democratic Party",
                "Population": 19453561,
                "Before": 605,
                "After": 711
              },
              {
                "State": "North Carolina",
                "Before_per_Million": 97,
                "After_per_Million": 136,
                "Party": "Republican Party",
                "Population": 10488084,
                "Before": 1017,
                "After": 1428
              },
              {
                "State": "North Dakota",
                "Before_per_Million": 39,
                "After_per_Million": 45,
                "Party": "Republican Party",
                "Population": 762062,
                "Before": 30,
                "After": 34
              },
              {
                "State": "Ohio",
                "Before_per_Million": 44,
                "After_per_Million": 76,
                "Party": "Unclear",
                "Population": 11689100,
                "Before": 515,
                "After": 886
              },
              {
                "State": "Oklahoma",
                "Before_per_Million": 79,
                "After_per_Million": 70,
                "Party": "Republican Party",
                "Population": 3956971,
                "Before": 312,
                "After": 276
              },
              {
                "State": "Oregon",
                "Before_per_Million": 43,
                "After_per_Million": 51,
                "Party": "Democratic Party",
                "Population": 4217737,
                "Before": 182,
                "After": 216
              },
              {
                "State": "Pennsylvania",
                "Before_per_Million": 32,
                "After_per_Million": 41,
                "Party": "Democratic Party",
                "Population": 12801989,
                "Before": 407,
                "After": 525
              },
              {
                "State": "Rhode Island",
                "Before_per_Million": 55,
                "After_per_Million": 17,
                "Party": "Democratic Party",
                "Population": 1059361,
                "Before": 58,
                "After": 18
              },
              {
                "State": "South Carolina",
                "Before_per_Million": 139,
                "After_per_Million": 262,
                "Party": "Republican Party",
                "Population": 5148714,
                "Before": 718,
                "After": 1347
              },
              {
                "State": "South Dakota",
                "Before_per_Million": 50,
                "After_per_Million": 52,
                "Party": "Republican Party",
                "Population": 884659,
                "Before": 44,
                "After": 46
              },
              {
                "State": "Tennessee",
                "Before_per_Million": 86,
                "After_per_Million": 125,
                "Party": "Republican Party",
                "Population": 6829174,
                "Before": 588,
                "After": 851
              },
              {
                "State": "Texas",
                "Before_per_Million": 127,
                "After_per_Million": 186,
                "Party": "Republican Party",
                "Population": 28995881,
                "Before": 3682,
                "After": 5388
              },
              {
                "State": "Utah",
                "Before_per_Million": 128,
                "After_per_Million": 168,
                "Party": "Republican Party",
                "Population": 3205958,
                "Before": 410,
                "After": 538
              },
              {
                "State": "Vermont",
                "Before_per_Million": 3,
                "After_per_Million": 5,
                "Party": "Democratic Party",
                "Population": 623989,
                "Before": 2,
                "After": 3
              },
              {
                "State": "Virginia",
                "Before_per_Million": 53,
                "After_per_Million": 68,
                "Party": "Democratic Party",
                "Population": 8535519,
                "Before": 450,
                "After": 577
              },
              {
                "State": "Washington",
                "Before_per_Million": 45,
                "After_per_Million": 61,
                "Party": "Democratic Party",
                "Population": 7614893,
                "Before": 344,
                "After": 461
              },
              {
                "State": "West Virginia",
                "Before_per_Million": 18,
                "After_per_Million": 26,
                "Party": "Republican Party",
                "Population": 1792147,
                "Before": 32,
                "After": 46
              },
              {
                "State": "Wisconsin",
                "Before_per_Million": 54,
                "After_per_Million": 81,
                "Party": "Democratic Party",
                "Population": 5822434,
                "Before": 314,
                "After": 472
              },
              {
                "State": "Wyoming",
                "Before_per_Million": 36,
                "After_per_Million": 52,
                "Party": "Republican Party",
                "Population": 578759,
                "Before": 21,
                "After": 30
              }
            ]
          }

        this.setState({
            initData_covid:covid.data,
            viewData_covid: dm.varia(covid.data)
        })
        // axios.get('/static/covid.json')
        // .then(res=>{
        //     this.setState({
        //         initData_covid: res.data.data,
        //         viewData_covid: dm.varia(res.data.data)
        //     })
        // })
    
        let example = {
            "code": 200,
            "data": [
              {
                "name": "Livia",
                "midterm": 60,
                "final": 69
              },
              {
                "name": "Emma",
                "midterm": 72,
                "final": 79
              },
              {
                "name": "Ava",
                "midterm": 81,
                "final": 85
              },
              {
                "name": "Sophia",
                "midterm": 83,
                "final": 96
              },
              {
                "name": "Isabella",
                "midterm": 87,
                "final": 94
              },
              {
                "name": "Charlotte",
                "midterm": 72,
                "final": 75
              },
              {
                "name": "Amelia",
                "midterm": 76,
                "final": 79
              },
              {
                "name": "Mia",
                "midterm": 91,
                "final": 92
              },
              {
                "name": "Harper",
                "midterm": 64,
                "final": 75
              },
              {
                "name": "Evelyn",
                "midterm": 72,
                "final": 79
              },
              {
                "name": "Abigail",
                "midterm": 65,
                "final": 89
              },
              {
                "name": "Emily",
                "midterm": 79,
                "final": 72
              },
              {
                "name": "Ella",
                "midterm": 93,
                "final": 84
              },
              {
                "name": "Elizabeth",
                "midterm": 75,
                "final": 79
              },
              {
                "name": "Camila",
                "midterm": 95,
                "final": 90
              },
              {
                "name": "Luna",
                "midterm": 81,
                "final": 84
              },
              {
                "name": "Sofia",
                "midterm": 62,
                "final": 72
              },
              {
                "name": "Avery",
                "midterm": 75,
                "final": 68
              },
              {
                "name": "Mila",
                "midterm": 60,
                "final": 73
              },
              {
                "name": "Aria",
                "midterm": 74,
                "final": 75
              },
              {
                "name": "Scarlett",
                "midterm": 68,
                "final": 71
              },
              {
                "name": "Penelope",
                "midterm": 64,
                "final": 67
              },
              {
                "name": "Layla",
                "midterm": 71,
                "final": 72
              },
              {
                "name": "Chloe",
                "midterm": 85,
                "final": 85
              },
              {
                "name": "Victoria",
                "midterm": 65,
                "final": 66
              },
              {
                "name": "Madison",
                "midterm": 78,
                "final": 72
              },
              {
                "name": "Eleanor",
                "midterm": 62,
                "final": 74
              },
              {
                "name": "Grace",
                "midterm": 82,
                "final": 89
              },
              {
                "name": "Nora",
                "midterm": 85,
                "final": 67
              },
              {
                "name": "Riley",
                "midterm": 70,
                "final": 78
              },
              {
                "name": "Zoey",
                "midterm": 87,
                "final": 71
              },
              {
                "name": "Hannah",
                "midterm": 77,
                "final": 60
              },
              {
                "name": "Hazel",
                "midterm": 83,
                "final": 90
              },
              {
                "name": "Lily",
                "midterm": 72,
                "final": 76
              },
              {
                "name": "Ellie",
                "midterm": 92,
                "final": 70
              },
              {
                "name": "Violet",
                "midterm": 75,
                "final": 65
              },
              {
                "name": "Lillian",
                "midterm": 76,
                "final": 79
              },
              {
                "name": "Zoe",
                "midterm": 78,
                "final": 62
              },
              {
                "name": "Stella",
                "midterm": 59,
                "final": 69
              },
              {
                "name": "Aurora",
                "midterm": 84,
                "final": 76
              }
            ]
          }
          this.setState({
            initData_example: example.data,
            viewData_example: dm.varia(example.data)
        })
          
        // axios.get('/static/example.json')
        // .then(res=>{
        //     this.setState({
        //         initData_example: res.data.data,
        //         viewData_example: dm.varia(res.data.data)
        //     })
        // })
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
