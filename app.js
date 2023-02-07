const { createBot, 
    createProvider, 
    createFlow, 
    addKeyword } = require('@bot-whatsapp/bot') 

const QRPortalWeb = require('@bot-whatsapp/portal')

const WsProvider = require('@bot-whatsapp/provider/baileys')
const DBProvider = require('@bot-whatsapp/database/mock')

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
]})

const FlujoPrincipal = addKeyword(['hola','oe','buenas'])
.addAnswer('Bienvenido a *Yachay MarketPlace* la tienda digital más grande de Yachay')
.addAnswer('¿Qué deseas hacer?:',
{buttons: [
{
    body: 'Comprar'
},
{
    body:'Vender'
}
]
})
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

main()
