(this.webpackJsonppart2_exercise_phonebook_forms=this.webpackJsonppart2_exercise_phonebook_forms||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},36:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(13),c=t.n(o),u=t(2),l=function(e){var n=e.person,t=e.handleDelete;return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",null,n.name,"  ",n.number,r.a.createElement("button",{onClick:t},"delete")))},i=t(3),m=t.n(i),f="/api/persons",d=function(){return m.a.get(f).then((function(e){return e.data}))},s=function(e){return m.a.post(f,e).then((function(e){return e.data}))},b=function(e){return m.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},h=function(e,n){return m.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},p=function(e){var n=e.message;return null===n?null:r.a.createElement("div",{className:"error"},n)},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),i=Object(u.a)(c,2),m=i[0],f=i[1],E=Object(a.useState)(""),v=Object(u.a)(E,2),g=v[0],w=v[1],O=Object(a.useState)(""),j=Object(u.a)(O,2),k=j[0],C=j[1],S=Object(a.useState)(null),y=Object(u.a)(S,2),_=y[0],D=y[1];Object(a.useEffect)((function(){d().then((function(e){o(e)}))}),[]);var x=""===k?t:t.filter((function(e){return-1!==e.name.toLowerCase().indexOf(k.toLowerCase())}));return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(p,{message:_}),r.a.createElement("div",null,r.a.createElement("p",null,"filter shown with",r.a.createElement("input",{value:k,onChange:function(e){C(e.target.value)}}))),r.a.createElement("h2",null,"Add a new"),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===m}));console.log("found person",n);var a={name:m,number:g};null===n||void 0===n?(s(a).then((function(e){return o(t.concat(e))})),D("Added ".concat(a.name)),f(""),w("")):window.confirm("".concat(m," is already added to phonebook \n Would you like to replace the old number with a new one?"))&&(h(n.id,a).then((function(e){console.log("updated contacts",e),o(t.map((function(t){return t.id!==n.id?t:e}))),D("Changed number of ".concat(n.name))})).catch((function(e){D("Information for ".concat(m," has already been remove from server")),o(t.filter((function(e){return e.id!==n.id})))})),f(""),w(""))}},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:m,onChange:function(e){f(e.target.value)}}),r.a.createElement("br",null),"number: ",r.a.createElement("input",{value:g,onChange:function(e){w(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))),r.a.createElement("h2",null,"Numbers"),x.map((function(e){return r.a.createElement(l,{key:e.name+e.number,person:e,handleDelete:function(){var n;n=e,window.confirm("Delete ".concat(n.name,"?"))&&(b(n.id),o(t.filter((function(e){return e.id!==n.id}))),D("Delete ".concat(n.name)))}})})))};t(36);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(E,null)),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.74535003.chunk.js.map