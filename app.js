const { createBot, 
    createProvider, 
    createFlow, 
    addKeyword } = require('@bot-whatsapp/bot') 

const QRPortalWeb = require('@bot-whatsapp/portal')

const WsProvider = require('@bot-whatsapp/provider/baileys')
const DBProvider = require('@bot-whatsapp/database/mock')

const FlujoBebidas = addKeyword(['Bebidas','Bebida'])
.addAnswer('*Elige la bebida que deseas comprar:*')
.addAnswer('*1*',{buttons:[
    {
        body: 'Switch ($3,50)'
    }
]})
.addAnswer(' ',{media:'https://licoreschullavida.com/wp-content/uploads/2020/11/switch-bongo-bongo.jpg'})
.addAnswer('*2*',{buttons:[
    {
        body: 'Zhumir Naranjilla ($5,75)'
    }
]})
.addAnswer(' ',{media:'https://www.supermercadosantamaria.com/documents/10180/10504/100757_M.jpg'})
.addAnswer('*3*',{buttons:[
    {
        body: 'Monster ($3,50)'
    }
]})
.addAnswer(' ',{media:'https://www.fybeca.com/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_FybecaEcuador/default/dw99280eb3/images/large/119662-BEBIDA-MONSTER-ENERGY-473ML-LATA.jpg?sw=1000&sh=1000'})
.addAnswer('*4*',{buttons:[
    {
        body: 'Red Bull ($2,50)'
    }
]})
.addAnswer(' ',{media:'https://www.fybeca.com/dw/image/v2/BDPM_PRD/on/demandware.static/-/Sites-masterCatalog_FybecaEcuador/default/dw6a7c8972/images/large/86375-ENERGIZANTE-RED-BULL-RED-BULL-250-ML-UNIDAD.jpg?sw=1000&sh=1000'})
.addAnswer('*5*',{buttons:[
    {
        body: 'Café Cafelixc ($5)'
    }
]})
.addAnswer(' ',{media:'https://www.supermercadosantamaria.com/documents/10180/10504/120401440_G.jpg'})

const FlujoComprar = addKeyword(['Comprar','Compras'])
.addAnswer('¿En qué categoría se encuentra tu compra?',
{buttons:[
    {
        body: 'Bebidas'
    },
    {
        body: 'Comida'
    },
    {
        body: 'Dulces'
    },
    {
        body: 'Artículos'
    },
    {
        body: 'Servicios'
    }
]},null,[FlujoBebidas])

const FlujoPrincipal = addKeyword(['hola','oe','buenas'])
.addAnswer('Bienvenido a *Yachay MarketPlace* la tienda digital más grande de Yachay')
.addAnswer('¿Qué deseas hacer?',
{buttons: [
{
    body: 'Comprar'
},
{
    body:'Vender'
}
]
},null, [FlujoComprar])
/*.addAnswer('Cual es tu email?',{capture:true},(ctx,{fallBack}) => {

    if(!ctx.body.includes('@')){
        return fallBack()
    }
    
    console.log('Mensaje entrante: ',ctx.body)

})
.addAnswer('en los siguientes minutos te envio un email')
*/
const FlujoSecundario = addKeyword('gracias')
.addAnswer('De nada!')

const main = async () =>{
    
    const adapterDB = new DBProvider()
    const adapterFlow = createFlow([FlujoPrincipal, FlujoSecundario])
    const adapterProvider = createProvider(WsProvider)

    createBot(
        {
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        }
    )
}
QRPortalWeb({port:3000})
main()
