let prize10k = 0;
let prize20k = 0;
let prize50k = 0;
let prize100k = 0;
let prize200k = 0;
let prize500k = 0;

const idx10 = 0;
const idx20 = 1;
const idx50 = 2;
const idx100 = 3;
const idx200 = 4;

function isIn (value, from, to){
    return value >= from && value <= to;
}
console.log(window.innerWidth);
const congrats = document.getElementById("title");
$("#title").click(function () {
    $("#title").toggle();
})

$(".instruction__button").click(function () {
    console.log('click')
    $(".instruction__text").slideToggle();
})

const myLucky = new LuckyCanvas.LuckyWheel('#my-lucky', {
    width: `${window.innerWidth > 600 ? 600 : window.innerWidth}px`,
    height: `${window.innerWidth > 600 ? 600 : window.innerWidth}px`,
    blocks: [{ padding: '10px', background: '#617df2' }],
    prizes: [
        { background: '#e9e8fe', fonts: [{ text: '10k' }] },
        { background: '#b8c5f2', fonts: [{ text: '20k' }] },
        { background: '#e9e8fe', fonts: [{ text: '50k' }] },
        { background: '#b8c5f2', fonts: [{ text: '100k' }] },
        { background: '#e9e8fe', fonts: [{ text: '200k' }] },
        { background: '#b8c5f2', fonts: [{ text: '500k' }] },
        { background: '#e9e8fe', fonts: [{ text: '20k' }] },
        { background: '#b8c5f2', fonts: [{ text: '10k' }] },
        { background: '#e9e8fe', fonts: [{ text: '20k' }] },
        { background: '#b8c5f2', fonts: [{ text: '50k' }] },
        { background: '#e9e8fe', fonts: [{ text: '50k' }] },
        { background: '#b8c5f2', fonts: [{ text: '10k' }] },
    ],
    buttons: [{
        radius: '35%',
        background: '#8a9bf3',
        pointer: true,
        fonts: [{ text: 'Quay', top: '-10px' }]
    }],
    start: function () {
        myLucky.play()
        setTimeout(() => {
            const value = Math.floor(Math.random() * 100);

            if (isIn(value, 99, 100) && isIn(prize200k, 0, 1)) { // 1% for 200k and 2 prizes
                myLucky.stop(idx200)
                prize200k += 1;
                return;
            }
            if (isIn(value, 97, 99) && isIn(prize100k, 0, 2)) { // 2% for 100k and 3 prizes
                myLucky.stop(idx100)
                prize100k += 1;
                return;
            }
            if (isIn(value, 90, 97) && isIn(prize50k, 0, 9)) { // 8% for 50k and 10 prizes
                myLucky.stop(idx50)
                prize50k += 1;
                return
            }
            if (isIn(value, 20, 90)) {
                myLucky.stop(idx20)
                prize20k += 1;
                return
            }
            prize10k += 1;
            myLucky.stop(idx10)

        }, 300)
    },
    end: function (prize) {
        const value = document.getElementById("value");
        value.innerHTML = `Nhận lì xì ${prize.fonts[0].text} bạn!`
        $("#prize200k").text(`Có <b>${prize200k}</b> đã được lì xì 200k`)
        $("#prize100k").text(`Có <b>${prize100k}</b> đã được lì xì 100k`)
        $("#prize50k").text(`Có <b>${prize50k}</b> đã được lì xì 50k`)
        $("#prize20k").html(`Có <b>${prize20k}</b> đã được lì xì 20k`)
        $("#prize10k").html(`Có <b>${prize10k}</b> đã được lì xì 10k`)
        $(".instruction__text--gain").html(
            `
            Có <b>${prize500k}</b> người lấy được <u>500k</u>
            <br />
            Có <b>${prize200k}</b> người lấy được <u>200k</u>
             <br />
            Có <b>${prize100k}</b> người lấy được <u>100k</u>
            <br />
            Có <b>${prize50k}</b> người lấy được <u>50k</u>
            <br />
            Có <b>${prize20k}</b> người lấy được <u>20k</u>
            <br />
            Có <b>${prize10k}</b> người lấy được <u>10k</u>
            `
        )
        congrats.click()
    }
})
