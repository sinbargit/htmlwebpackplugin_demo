export default function () {
    return new Promise((resolve)=>{
        setTimeout(function () {
            resolve({
                root:{style:{color:"#8B008B","fontSize":"14px","backgroundColor":"#f1f1f1",overflow:"hidden"}},
                left:{style:{color:"#FFC0CB",float:"left"}},
                right:{style:{color:"#D1D1D1",float:"left"}}
            })
        },0)
    })
}