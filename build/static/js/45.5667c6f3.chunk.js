(this["webpackJsonplang-wayz"]=this["webpackJsonplang-wayz"]||[]).push([[45],{612:function(e,t,a){"use strict";a.r(t);var c=a(14),n=a(294),l=a(272),s=a(311),i=a(293),r=a(290),d=a(308),j=a(23),o=a(233),b=a(0),u=a.n(b),m=a(43),x=a(90),h=a(1);t.default=function(){var e=Object(b.useState)(""),t=Object(c.a)(e,2),a=t[0],O=t[1],f=Object(b.useState)([]),p=Object(c.a)(f,2),y=p[0],g=p[1],v=Object(b.useState)(""),w=Object(c.a)(v,2),S=w[0],T=w[1],k=Object(b.useState)([]),N=Object(c.a)(k,2),C=N[0],L=N[1];Object(b.useEffect)((function(){fetch("".concat(j.a.apiServer,"/game/get-games")).then((function(e){return e.json()})).then((function(e){L(e)}))}),[]),Object(b.useEffect)((function(){a&&S&&fetch("".concat(j.a.apiServer,"/leaderboard/").concat(a,"/").concat(S)).then((function(e){return e.json()})).then((function(e){return g(e.leaderboard)}))}),[a,S]);var D=y.map((function(e,t){return{index:t+1,userName:e.userName,email:e.usermail,score:e.score,lastUpdatedDate:Object(o.a)(new Date(e.updatedAt),"dd-MM-yyyy")}}));return Object(h.jsxs)(u.a.Fragment,{children:[Object(h.jsx)(m.a,{title:"Leader Board",children:Object(h.jsxs)(n.a,{container:!0,rowSpacing:1,columnSpacing:{xs:1,sm:2,md:3},children:[Object(h.jsx)(n.a,{item:!0,xs:6,children:Object(h.jsx)(l.a,{sx:{display:"flex",justifyContent:"center"},children:Object(h.jsxs)(s.a,{color:"secondary",sx:{width:"250px"},children:[Object(h.jsx)(i.a,{id:"demo-simple-select-label",children:"Time"}),Object(h.jsxs)(r.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:a,label:"Time",onChange:function(e){O(e.target.value)},children:[Object(h.jsx)(d.a,{value:"daily",children:"Daily"}),Object(h.jsx)(d.a,{value:"weekly",children:"Weekly"}),Object(h.jsx)(d.a,{value:"lifetime",children:"Life Time"})]})]})})}),Object(h.jsx)(n.a,{item:!0,xs:6,children:Object(h.jsx)(l.a,{sx:{display:"flex",justifyContent:"center"},children:Object(h.jsxs)(s.a,{color:"secondary",sx:{width:"250px"},children:[Object(h.jsx)(i.a,{id:"demo-simple-select-label",children:"Game Type"}),Object(h.jsx)(r.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:S,label:"Game Type",onChange:function(e){T(e.target.value)},children:C.map((function(e){return Object(h.jsx)(d.a,{value:e.id,children:e.gameName},e.id)}))})]})})})]})}),Object(h.jsx)(m.a,{title:"LeaderBoard Table",sx:{mt:5},children:y.length>0?Object(h.jsx)(x.a,{titles:["Rank","User Name","Email","Score","Last updated date"],data:D}):Object(h.jsx)(l.a,{sx:{textAlign:"center"},children:"No data found"})})]})}}}]);
//# sourceMappingURL=45.5667c6f3.chunk.js.map