$(document).ready(function () {
    let prize50k = 0;
    let prize100k = 0;
    let prize200k = 0;

    const idx10 = 0;
    const idx20 = 1;
    const idx50 = 2;
    const idx100 = 3;
    const idx200 = 4;


    const updateSummaryPrizes = (prizes) => {
        $(".instruction__text--gain").html(
            `
            Có <b>${prizes["500k"]}</b> người lấy được <u>500k</u>
            <br />
            Có <b>${prizes["200k"]}</b> người lấy được <u>200k</u>
             <br />
            Có <b>${prizes["100k"]}</b> người lấy được <u>100k</u>
            <br />
            Có <b>${prizes["50k"]}</b> người lấy được <u>50k</u>
            <br />
            Có <b>${prizes["20k"]}</b> người lấy được <u>20k</u>
            <br />
            Có <b>${prizes["10k"]}</b> người lấy được <u>10k</u>
            `
        )
    }

    function isIn(value, from, to) {
        return value >= from && value <= to;
    }

    $("#title").click(function () {
        $("#title").toggle();
    })

    $(".instruction__button").click(function () {
        $(".instruction__text").slideToggle();
    })

    const prizes = JSON.parse($("#prizes").val()).prizes
    updateSummaryPrizes(prizes);

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

                if (isIn(value, 99, 100) && isIn(prizes["200k"], 0, 1)) { // 1% for 200k and 2 prizes
                    myLucky.stop(idx200)
                    return;
                }
                if (isIn(value, 97, 99) && isIn(prizes["100k"], 0, 2)) { // 2% for 100k and 3 prizes
                    myLucky.stop(idx100)
                    return;
                }
                if (isIn(value, 90, 97) && isIn(prizes["50k"], 0, 9)) { // 8% for 50k and 10 prizes
                    myLucky.stop(idx50)
                    return
                }
                if (isIn(value, 10, 90)) {
                    myLucky.stop(idx20)
                    return
                }
                prize10k += 1;
                myLucky.stop(idx10)

            }, 300)
        },
        end: function (prize) {
            const value = document.getElementById("value");
            value.innerHTML = `Nhận lì xì ${prize.fonts[0].text} nhó!`
            const id = prize.fonts[0].text

            $.ajax({
                type: "POST",
                url: "/Index?handler=Data",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("XSRF-TOKEN",
                        $('input:hidden[name="__RequestVerificationToken"]').val()
                    )
                },
                data: { "id": id, value: prizes[id] + 1 },
                success: function (rs) {
                    console.log(rs)
                    updateSummaryPrizes(JSON.parse(rs).prizes)

                }
            })

            $("#title").click()
        }
    })


})