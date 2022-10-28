const c = (e)=>{
    return document.querySelector(e)
}

let seuVotoPara = c('.d-1-1')
let cargo = c('.d-1-2')
let numeros = c('.d-1-3')
let descricao = c('.d-1-4')
let lateral = c('.d-1-right')
let aviso = c('.d-2')
let etapaAtual = 0
let votoBranco = false

function iniciar(){

    let etapa = etapas[etapaAtual]
    let numeroHtml = ''
    numero = ''

    for(i = 0; i < etapa.numeros; i++ ){
        if(i==0){
            numeroHtml += '<div class="numero pisca"></div>'
        }else{
            numeroHtml += '<div class="numero"></div>'
        }
    }
    cargo.innerHTML = etapa.titulo
    seuVotoPara.innerHTML = ''
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numeroHtml
}
let numero = ''

function clicou(n){

    let elNumero = c('.numero.pisca')

        if(elNumero !== null){
            elNumero.innerHTML = n
            elNumero.classList.remove('pisca')
            numero += `${n}`

        }if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca')

        }else{
            atualizaInterface()
        }
   
}
function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item)=>{

        if(item.numero == numero){
            return true
        }else{
            return false
        }
    })
   
        if(candidato.length > 0){

            let fotosHtml = ''
            candidato = candidato[0]
            seuVotoPara.innerHTML = "SEU VOTO PARA"
            descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido:${candidato.partido}`
            aviso.style.display = 'block'

            for(let i in candidato.fotos){
                if(candidato.fotos[i].small){
                    fotosHtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}`
                }else{
                    fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}`
                }
                
            }
            lateral.innerHTML = fotosHtml
            
        }else{
           descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'
           seuVotoPara.innerHTML = "SEU VOTO PARA"
           aviso.style.display = 'block'
        }

}
function branco(){
    let etapa = etapas[etapaAtual]

    for(let i in etapa.candidatos){

    if(numero == '' || numero == etapa.candidatos[i].numero ){
        votoBranco = true
        seuVotoPara.innerHTML = "SEU VOTO PARA"
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'
        aviso.style.display = 'block'
        numeros.innerHTML = ''
        lateral.innerHTML = ''
    }
}
}

function corrige(){
    iniciar()
}

function confirma(){
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false

    if(votoBranco === true){
        votoConfirmado = true
        console.log(`Para ${etapa.titulo} Votou em : ` + 'Branco' )

    }else if(numero.length === etapa.numeros){
        votoConfirmado =  true
        console.log(`Para ${etapa.titulo} Votou em : `  + numero )
    }

    if(votoConfirmado == true){
        etapaAtual++
       
        if(etapas[etapaAtual] !== undefined){
            iniciar()
            
        }else{
            seuVotoPara.innerHTML = ''
            descricao.innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
            lateral.innerHTML = ''
            cargo.innerHTML = ''
            aviso.style.display = 'none'
            numeros.innerHTML = ''
        }
   }
}

iniciar()