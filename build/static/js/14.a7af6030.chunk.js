(this["webpackJsonplang-wayz"]=this["webpackJsonplang-wayz"]||[]).push([[14],{372:function(e,t,n){"use strict";var a=n(0);t.a=function(){var e=Object(a.useRef)(!0);return Object(a.useEffect)((function(){return function(){e.current=!1}}),[]),e}},373:function(e,t,n){"use strict";var a=n(14),r=n(0),i=n(651),c=n(635),s=n(1),o=Object(r.forwardRef)((function(e,t){var n,r,o,l,d=e.children,j=e.type,u=e.direction,b=e.offset,h=e.scale;switch(u){case"up":case"left":o=b,l=0;break;default:o=0,l=b}var m=Object(i.a)(o,l),x=Object(a.a)(m,2),O=x[0],p=x[1],f=Object(i.a)(o,l),v=Object(a.a)(f,2),g=v[0],w=v[1];switch(j){case"rotate":return Object(s.jsx)(c.a.div,{ref:t,animate:{rotate:360},transition:{repeat:1/0,repeatType:"loop",duration:2,repeatDelay:0},children:d});case"slide":return"up"===u||"down"===u?Object(s.jsx)(c.a.div,{ref:t,animate:{y:void 0!==g?g:""},onHoverEnd:function(){return w()},onHoverStart:function(){return w()},children:d}):Object(s.jsx)(c.a.div,{ref:t,animate:{x:void 0!==O?O:""},onHoverEnd:function(){return p()},onHoverStart:function(){return p()},children:d});default:return"number"===typeof h&&(h={hover:h,tap:h}),Object(s.jsx)(c.a.div,{ref:t,whileHover:{scale:null===(n=h)||void 0===n?void 0:n.hover},whileTap:{scale:null===(r=h)||void 0===r?void 0:r.tap},children:d})}}));o.defaultProps={type:"scale",offset:10,direction:"right",scale:{hover:1,tap:.9}},t.a=o},374:function(e,t,n){"use strict";var a=n(12),r=n(51),i=n(272),c=n(43),s=n(1),o=["children"];t.a=function(e){var t=e.children,n=Object(r.a)(e,o);return Object(s.jsx)(c.a,Object(a.a)(Object(a.a)({sx:{maxWidth:{xs:400,lg:475},margin:{xs:2.5,md:3},"& > *":{flexGrow:1,flexBasis:"50%"}},content:!1},n),{},{children:Object(s.jsx)(i.a,{sx:{p:{xs:2,sm:3,xl:5}},children:t})}))}},375:function(e,t,n){"use strict";var a=n(5),r=Object(a.a)("div")((function(e){return{backgroundColor:e.theme.palette.primary.light,minHeight:"100vh"}}));t.a=r},649:function(e,t,n){"use strict";n.r(t);var a=n(283),r=n(294),i=n(279),c=n(71),s=n(215),o=n(24),l=n(148),d=n(0),j=n(15),u=n(31),b=n(133),h=n(12),m=n(116),x=n.n(m),O=n(134),p=n(14),f=n(421),v=n.n(f),g=n(422),w=n.n(g),y=n(272),S=n(311),k=n(293),C=n(297),E=n(312),H=n(302),I=n(309),B=n(299),P=n(23),T=n(321),W=n(372),q=n(373),z=n(323),A=n(1),D=function(e){var t=Object.assign({},e),n=Object(o.a)(),a=Object(W.a)(),i=Object(j.g)(),s=Object(d.useState)(!1),l=Object(p.a)(s,2),u=l[0],b=l[1],m=function(){b(!u)},f=function(e){e.preventDefault()},g=function(e){fetch("".concat(P.a.apiServer,"/admin/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userName:e.email,password:e.password})}).then((function(e){return e.json()})).then((function(e){e.token&&(console.log("TOKEN",e.token),i("/admin",!0),localStorage.setItem("token",e.token))}))};return Object(A.jsxs)(A.Fragment,{children:[Object(A.jsx)(r.a,{container:!0,direction:"column",justifyContent:"center",spacing:2,children:Object(A.jsx)(r.a,{item:!0,xs:12,container:!0,alignItems:"center",justifyContent:"center",children:Object(A.jsx)(y.a,{sx:{mb:2},children:Object(A.jsx)(c.a,{variant:"subtitle1",children:"Sign in with Email address"})})})}),Object(A.jsx)(T.e,{initialValues:{email:"admin",password:"asdf1234",submit:null},validationSchema:z.c().shape({email:z.d().max(255).required("Email or username is required"),password:z.d().max(255).required("Password is required")}),onSubmit:function(){var e=Object(O.a)(x.a.mark((function e(t,n){var r,i,c;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=n.setErrors,i=n.setStatus,c=n.setSubmitting;try{a.current&&(i({success:!0}),c(!1),g(t))}catch(s){console.error(s),a.current&&(i({success:!1}),r({submit:s.message}),c(!1))}case 2:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),children:function(e){var a=e.errors,r=e.handleBlur,i=e.handleChange,c=e.handleSubmit,s=e.isSubmitting,o=e.touched,l=e.values;return Object(A.jsxs)("form",Object(h.a)(Object(h.a)({noValidate:!0,onSubmit:c},t),{},{children:[Object(A.jsxs)(S.a,{fullWidth:!0,error:Boolean(o.email&&a.email),sx:Object(h.a)({},n.typography.customInput),children:[Object(A.jsx)(k.a,{htmlFor:"outlined-adornment-email-login",children:"Email Address / Username"}),Object(A.jsx)(C.a,{id:"outlined-adornment-email-login",type:"email",value:l.email,name:"email",onBlur:r,onChange:i,label:"Email Address / Username",inputProps:{}}),o.email&&a.email&&Object(A.jsx)(E.a,{error:!0,id:"standard-weight-helper-text-email-login",children:a.email})]}),Object(A.jsxs)(S.a,{fullWidth:!0,error:Boolean(o.password&&a.password),sx:Object(h.a)({},n.typography.customInput),children:[Object(A.jsx)(k.a,{htmlFor:"outlined-adornment-password-login",children:"Password"}),Object(A.jsx)(C.a,{id:"outlined-adornment-password-login",type:u?"text":"password",value:l.password,name:"password",onBlur:r,onChange:i,endAdornment:Object(A.jsx)(H.a,{position:"end",children:Object(A.jsx)(I.a,{"aria-label":"toggle password visibility",onClick:m,onMouseDown:f,edge:"end",size:"large",children:u?Object(A.jsx)(v.a,{}):Object(A.jsx)(w.a,{})})}),label:"Password",inputProps:{}}),o.password&&a.password&&Object(A.jsx)(E.a,{error:!0,id:"standard-weight-helper-text-password-login",children:a.password})]}),a.submit&&Object(A.jsx)(y.a,{sx:{mt:3},children:Object(A.jsx)(E.a,{error:!0,children:a.submit})}),Object(A.jsx)(y.a,{sx:{mt:2},children:Object(A.jsx)(q.a,{children:Object(A.jsx)(B.a,{disableElevation:!0,disabled:s,fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"secondary",children:"Sign in"})})})]}))}})]})},F=n(374),J=n(375);t.default=function(){var e=Object(j.g)();Object(d.useEffect)((function(){var t=localStorage.getItem("token");try{var n=t?Object(l.a)(t):{};(null===n||void 0===n?void 0:n.id)&&e("/admin")}catch(a){}}),[e]);var t=Object(o.a)(),n=Object(a.a)(t.breakpoints.down("md"));return Object(A.jsx)(J.a,{children:Object(A.jsx)(r.a,{container:!0,direction:"column",justifyContent:"flex-end",sx:{minHeight:"100vh"},children:Object(A.jsx)(r.a,{item:!0,xs:12,children:Object(A.jsx)(r.a,{container:!0,justifyContent:"center",alignItems:"center",sx:{minHeight:"calc(100vh - 68px)"},children:Object(A.jsx)(r.a,{item:!0,sx:{m:{xs:1,sm:3},mb:0},children:Object(A.jsx)(F.a,{children:Object(A.jsxs)(r.a,{container:!0,spacing:2,alignItems:"center",justifyContent:"center",children:[Object(A.jsx)(r.a,{item:!0,sx:{mb:3},children:Object(A.jsx)(u.b,{to:"#",children:Object(A.jsx)(b.a,{})})}),Object(A.jsx)(r.a,{item:!0,xs:12,children:Object(A.jsx)(r.a,{container:!0,direction:n?"column-reverse":"row",alignItems:"center",justifyContent:"center",children:Object(A.jsx)(r.a,{item:!0,children:Object(A.jsx)(i.a,{alignItems:"center",justifyContent:"center",spacing:1,children:Object(A.jsx)(c.a,{color:t.palette.secondary.main,gutterBottom:!0,variant:n?"h3":"h2",children:"Hi, Welcome Back"})})})})}),Object(A.jsx)(r.a,{item:!0,xs:12,children:Object(A.jsx)(D,{})}),Object(A.jsx)(r.a,{item:!0,xs:12,children:Object(A.jsx)(s.a,{})})]})})})})})})})}}}]);
//# sourceMappingURL=14.a7af6030.chunk.js.map