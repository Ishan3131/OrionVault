function game_card_hover(div) {
    console.log('hoverd')
    if(div.offSetLeft < 3*div.offSetWidth) {
        console.log(true)
        div.firstElementChild.classList.add('game_img_end_hover');
        div.lastElementChild.classList.add('game_detail_panel_end_hover');
    }
}

function game_card_mouseLeave(div) {
    if(div.offSetLeft < 3*div.offSetWidth) {
        div.firstElementChild.classList.remove('game_img_end_hover');
        div.lastElementChild.classList.remove('game_detail_panel_end_hover');
    }
}

export {game_card_hover, game_card_mouseLeave}