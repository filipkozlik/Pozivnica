(this.webpackJsonpdummy=this.webpackJsonpdummy||[]).push([[0],{13:function(e,t,a){},14:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(2),s=a.n(o),r=a(3),l=a(4),c=a(7),d=a(6),m=(a(13),a(5)),h=function(e){Object(c.a)(a,e);var t=Object(d.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={width:window.innerWidth,height:window.innerHeight,wedding_date:Date.parse("28 Nov 2020 16:30:00 GMT+0200"),remaining_time:0,refreshed:!0,hash:"",title:"Po\u0161tovani",single_person:!1},e.handleWindowSizeChange=function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];e.refresh_states()},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=window.location.search,t=new URLSearchParams(e).get("invite");if(null!==t)try{var a=m[t];this.setState({hash:{invite:t},title:a.title,single_person:a.single_person}),this.refreshRemainingTime()}catch(n){}this.refreshRemainingTime()}},{key:"componentWillMount",value:function(){window.addEventListener("resize",this.handleWindowSizeChange("Resize")),window.addEventListener("resize",this.handleWindowSizeChange)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleWindowSizeChange)}},{key:"refreshRemainingTime",value:function(){this.setState({remaining_time:this.state.wedding_date-Date.parse(new Date)}),alert("Wedding: "+this.state.wedding_date+"\nCurrent: "+Date.parse(new Date))}},{key:"refresh_states",value:function(){this.setState({width:window.innerWidth}),this.setState({height:window.innerHeight})}},{key:"render",value:function(){return window.performance&&this.state.refreshed&&1===performance.navigation.type&&(this.handleWindowSizeChange("Refresh"),this.setState({refreshed:!1})),i.a.createElement("div",{className:"site"},i.a.createElement("div",{className:"box text header"},i.a.createElement("h1",null,this.state.title,","),i.a.createElement("h1",null,"ovim putem pozivamo ",this.state.single_person?"te":"vas"," na na\u0161e vjen\u010danje."),i.a.createElement("h1",null,"Sve informacije o nama i na\u0161em vje\u010danju"," ",this.state.single_person?"mo\u017ee\u0161":"mo\u017eete"," prona\u0107i u retcima ispod."),i.a.createElement("h1",null,"Veselimo se ",this.state.single_person?"tvojem":"va\u0161em"," dolasku,"),i.a.createElement("h1",null,"Va\u0161i Dolores i Filip")),i.a.createElement("div",{className:"biography"},i.a.createElement("div",{className:"box about_doli_container doli_about_photo"},i.a.createElement("div",{className:"box center text name"},"Dolores"),i.a.createElement("div",{className:"center text about "},"O Dolores")),i.a.createElement("div",{className:"box about_filip_container filip_about_photo"},i.a.createElement("div",{className:"box center text name"},"Filip"),i.a.createElement("div",{className:"center text about"},"O Filipu"))),i.a.createElement("div",{className:"countdown"},i.a.createElement("div",{className:"box days countdown_color"},i.a.createElement("div",{className:"box center text countdown_title"},"Dana"),i.a.createElement("div",{className:"center text countdown_value"},i.a.createElement("h1",null,Math.floor(this.state.remaining_time/1e3/60/60/24)))),i.a.createElement("div",{className:"box hours countdown_color"},i.a.createElement("div",{className:"box center text countdown_title"},"Sati"),i.a.createElement("div",{className:"center text countdown_value"},i.a.createElement("h1",null,Math.floor(this.state.remaining_time/1e3/60/60%24)))),i.a.createElement("div",{className:"box minutes countdown_color"},i.a.createElement("div",{className:"box center text countdown_title"},"Minuta"),i.a.createElement("div",{className:"center text countdown_value"},i.a.createElement("h1",null,Math.floor(this.state.remaining_time/1e3/60%60))))))}}]),a}(n.Component);s.a.render(i.a.createElement(h,null),document.getElementById("root"))},5:function(e){e.exports=JSON.parse('{"44e5ef3e99104c97972dbc0271d88f94":{"title":"Draga Jedna Osobo","single_person":true,"hash":"44e5ef3e99104c97972dbc0271d88f94","phone":"+385911850817"},"63ceeceafed748519c811ad00a8520bf":{"title":"Dragi Vi\u0161e osoba","single_person":false,"hash":"63ceeceafed748519c811ad00a8520bf","phone":"+385958507004"}}')},8:function(e,t,a){e.exports=a(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.bcd75a0d.chunk.js.map