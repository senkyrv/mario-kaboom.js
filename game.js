kaboom({
    global: true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [134, 135, 247],


})

const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 420
let CURRENT_JUMP_FORCE = JUMP_FORCE
let BULLET_SPEED = 250
let SLIDER_SPEED = 100
const FALL_DEATH = 700
const ENEMY_SPEED = 20
const ANIMATING_OBJECT = 100
let isJumping = true

//SOUNDS
loadSound("coin_sound","sounds/smb_coin.wav")
loadSound("mush_sound","sounds/smb_powerup.wav")
loadSound("jump_sound","sounds/smb_jump.wav")
loadSound("game_over_sound", "sounds/smb_mariodie.wav")
loadSound("stomp_sound", "sounds/smb_stomp.wav")
loadSound("bump_sound", "sounds/smb_bump.wav")
loadSound("pipe_sound", "sounds/smb_pipe.wav")
loadSound("fire_sound", "sounds/smb_fireball.wav")

//SPRITES
loadRoot('https://i.imgur.com/')
loadSprite('coin', '6Kjw858.png')
loadSprite('evil-shroom', 'BveHuLs.png')
loadSprite('brick', '5E3NRza.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'bVTy3Pu.png')
loadSprite('mario_left','PHEd0b3.png')
loadSprite('mario_jump','0GMhJCD.png')
loadSprite('mario_left_jump','fspQ2Rh.png')
loadSprite('mushroom', 'STxFilj.png')
loadSprite('surprise', 'UQGZTnl.png')
loadSprite('unboxed', 'E7SYgo7.png')
loadSprite('pipe-top-left', '4GXaySC.png')
loadSprite('pipe-top-right', 'W2mOAyV.png')
loadSprite('pipe-bottom-left', 'P2rXLFp.png')
loadSprite('pipe-bottom-right', 'ALWpwDh.png')
loadSprite('bg', '4JGJToP.png')



loadSprite('blue_brick', 'ly3o97T.png');
loadSprite('blue_evil_shroom', 'GZpjhw3.png');
loadSprite('blue_brick_damaged', 'rbJpANd.png');
loadSprite('blue_block', 'qXvMc6S.png');


scene("game",({level, score}) => {
    layers(['bg', 'obj', 'ui'], 'obj')
    //MAPS
    const maps = [[
        '===================================================================================================================================================',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                                 =',
        '=                                                                                                                                         ()      =',
        '=                                                                                                   ~      [   ~    [    ~    [      ~    {}      =',
        '=                                                                                               ===================================================',
        '=    /    ~/~+~~                                                                               ==                                                 =',
        '=                                                                                           =====                                                 =',
        '~                   =                                                                      ======                                                 ~',
        '~                  ~~~        [     ~    [         ~      [       ~                       ~~~~~~~                                                 ~',
        '=============================================================================   =================                                                 ='
    ],[
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                          &                                                                                                                      @',
        '@                        & & &                                              %    $            %                 $ %                               @',
        '@                      & & & & &                                       @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@                          @',
        '@%%%%%%%%%%%%%%%%%   &&& & & & &&&&&       /////+                                                                                                 @',
        '@                                  &                           &&&&&                                                                              @',
        '@                                  &                          &&&&&&&                                                                    ()       @',
        '@                                  &                         &&&&&&&&&              %          $      %  $            %                  {}       @',
        '@@@@@@@@@@@@@@@@@@                 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'

    ],[
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                      ()                         @',
        '@                                                                                                                      {}                         @',
        '@%%%%%%%%%%%%%%%%%   1             %%            2               %%       1            %%          2               %%%%%%                         @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@                                                                                                                                                 @',
        '@@@@@@@@@@@@@@@@@@                                                                                                          @@@@@@@@@@@@@@@@@@@@@@@'
    ]
    ]
    const lvlCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid(), 'block'],
        '~': [sprite('block'), solid(), 'block-solid'],
        '*': [sprite('coin'), solid(), 'coin', {dir: 1}],
        '/': [sprite('surprise'), solid(),'surprise-coin'],
        '+': [sprite('surprise'), solid(),'surprise-mush'],
        '(': [sprite('pipe-top-left'), solid(),'pipe', scale(0.5)],
        ')': [sprite('pipe-top-right'), solid(),'pipe', scale(0.5)],
        '{': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
        '}': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
        '#': [sprite('unboxed'), solid()],
        ';': [sprite('surprise'), solid(),'surprise-mush'],
        ']': [sprite('mushroom'), solid(), 'mushroom', body()],
        '[': [sprite('evil-shroom'), 'enemy', {dir: 1}],
        '@': [sprite('blue_brick'), solid(), 'block', scale(0.5)],
        '$': [sprite('blue_evil_shroom'), 'enemy', {dir: 1}, scale(0.5)],
        '%': [sprite('blue_brick_damaged'), solid(), 'block-solid',  scale(0.5)],
        '&': [sprite('blue_block'), solid(), 'block', scale(0.5)],
        '1': [sprite('blue_block'), solid(), 'slider', scale(0.75), {dir: 1}],
        '2': [sprite('blue_block'), solid(), 'slider', scale(0.75), {dir: -1}],

    }
    const gameLvl = addLevel(maps[level],lvlCfg)

    const player = add([
        sprite('mario'), solid(),
        pos(50,250),
        body(),
        big(),
        origin('bot',
        {dir: 1})
    ])

    //MAKING MARIO BIGGER AFTER EATING SHROOM
    function big() {
        let timer = 0
        let isBig = false
        return {
            update() {
                if (isBig) {
                    CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                    timer -= dt()
                    if (timer <= 0) {
                        this.smallify()
                    }
                }
            },
            isBig() {
                return isBig
            },
            smallify() {
                this.scale = vec2(1)
                CURRENT_JUMP_FORCE = JUMP_FORCE
                timer = 0
                isBig = false
            },
            biggify(time) {
                this.scale = vec2(1.4)
                timer = time
                isBig = true
            }
        }
    }


    //HEADBUMPING SECRETBOXES
    player.on("headbump", (obj) => {
        if (obj.is('surprise-coin')) {
            play("bump_sound")
            gameLvl.spawn('*', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLvl.spawn('#', obj.gridPos.sub(0,0))
        }
        if (obj.is('surprise-mush')) {
            play("bump_sound")
            gameLvl.spawn(']', obj.gridPos.sub(0, 1))
            destroy(obj)
            gameLvl.spawn('#', obj.gridPos.sub(0,0))
        }
    })

    // COLLISIONS WITH MARIO
    player.collides('mushroom', (m) => {
        play("mush_sound")
        destroy(m)
        player.biggify(5)
    })

    player.collides('coin', (c) => {
        destroy(c)
        play("coin_sound");
        scoreLabel.value++
        scoreLabel.text = 'level ' + parseInt(level + 1) +"\n\n"+'score: ' + scoreLabel.value
    })

    //KEY CONTROLS
    keyDown('left',() =>{
        player.dir = -1
        if (isJumping){
            player.changeSprite('mario_left_jump')
        }
        else{
            player.changeSprite('mario_left')}
        //scoreLabel.move(-MOVE_SPEED,0)
        player.move(-MOVE_SPEED,0)
    })

    keyDown('right',() =>{
        player.dir = 1
        if (isJumping){
            player.changeSprite('mario_jump')
        }
        else{
            player.changeSprite('mario')}
        //scoreLabel.move(MOVE_SPEED,0)
        player.move(MOVE_SPEED,0)
    })
    keyPress('up',()=>{
        if (player.grounded()) {
            if (player.dir == 1){
                player.changeSprite('mario_jump')
            }
            if (player.dir == -1){
                player.changeSprite('mario_left_jump')
            }
            isJumping = true
            if (isJumping){
                play("jump_sound");
            }
            player.jump(CURRENT_JUMP_FORCE)
        }
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            go('game', {
                level: 1,
                score: 5
            })
        })
    })

    player.action( () => {
        if (!isJumping){
            if (player.dir == 1){
                player.changeSprite('mario')
            }
            if (player.dir == -1){
                player.changeSprite('mario_left')
            }

        }
    })


    function spawnBullet(p, dir){
        const bull = add([
            sprite('coin'),
            pos(p),
            'bullet',
            body(),
            scale(0.5),
            {dir: dir},
        ])
    }
    action('bullet',(m) => {
        m.move(m.dir * BULLET_SPEED,0)

    })
    keyPress('space',()=>{
        play("fire_sound")
        if (player.dir == 1){
            spawnBullet(player.pos.add(5,-20), player.dir)
        }
        if (player.dir == -1){
            spawnBullet(player.pos.add(-25,-20), player.dir)
        }
    })

    let scoreLabel = add([
        text('level ' + parseInt(level + 1) +"\n\n"+'score: ' + score),
        pos(player.pos.x - 25, player.pos.y - 220),
        layer('ui'),
        {
            value: score,
        }
    ])
    scoreLabel.action( () => {

        scoreLabel.pos.x = player.pos.x - 5
    })


    //add([text('level ' + parseInt(level + 1) ), pos(100, 50)])

    collides('bullet','block',(b) => {
        destroy(b)
    })
    collides('enemy','bullet',(e,b) => {
        play("stomp_sound")
        destroy(e)
        destroy(b)
        scoreLabel.value++
        scoreLabel.text = 'level ' + parseInt(level + 1) +"\n\n"+'score: ' + scoreLabel.value

    })

    action('mushroom',(m) => {
        m.move(30,0)
    })

    action('coin',(c) => {
        c.move(0, c.dir * ANIMATING_OBJECT)
        c.move(0, -c.dir * ANIMATING_OBJECT)
    })

    action('enemy',(m) => {
        m.move(m.dir * ENEMY_SPEED,0)
    })

    player.action(() => {
        if(player.grounded()) {
            isJumping = false
        }
    })

    player.collides('enemy', (d) => {
        if (isJumping) {
            play("stomp_sound")
            destroy(d)
            player.jump(CURRENT_JUMP_FORCE)
            scoreLabel.value++
            scoreLabel.text = 'level ' + parseInt(level + 1) +"\n\n"+'score: ' + scoreLabel.value

        } else {
            play("game_over_sound");
            go('lose', { score: scoreLabel.value})
        }
    })

    action('slider',(m) => {
        m.move(m.dir * SLIDER_SPEED,0)
    })

    collides('slider','block-solid',(s) => {
        s.dir = -s.dir

    })

    collides('enemy','block-solid',(e) => {
        e.dir = -e.dir
    })

    player.action(() => {
        camPos(player.pos)
        if (player.pos.y >= FALL_DEATH){
            play("game_over_sound");
            go('lose',{score: scoreLabel.value})
        }
    })

    player.collides('pipe', () => {
        keyPress('down', () => {
            play("mush_sound")
            go('game', {
                level : (level + 1),
                score: scoreLabel.text = scoreLabel.value
            })
        })
    })

})

scene('lose', ({ score }) => {
    if(parseInt(localStorage.getItem('best_score') == null))
    {
        localStorage.setItem('best_score', 0)
    }

    if (parseInt(localStorage.getItem('best_score')) < score ){
        add([text('NEW HIGHSCORE', 32), origin('center'), pos(width()/2, height()/ 2-100)])
        localStorage.setItem('best_score', score.toString())
    }

    add([text('score: ' + score, 32), origin('center'), pos(width()/2, height()/ 2)])
    add([text('best score: ' + localStorage.getItem('best_score'), 32), origin('center'), pos(width()/2, height()/ 2 + 50)])
})

start("game", { level: 0, score: 0})
