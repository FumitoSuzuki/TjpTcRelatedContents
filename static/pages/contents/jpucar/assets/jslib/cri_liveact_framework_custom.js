/****************************************************************************
 *
 * LiveAct(R) PRO
 * Framework Customize
 *
 * (c) 2016 CRI Middleware Co., Ltd.
 * Version : 1.67.545.1.1
 *
 ****************************************************************************/
"use strict";
// frameworkの読み込み確認コード
if(typeof(CriLaFw) === "undefined" || !CriLaFw.isScriptLoaded){
    console.log("LiveAct Warning : cri_liveact_framework.js is not loaded");
}

// 360度動画において、下記機能をONにするフラグです。
// [拡大 / 縮小]
//   PC : マウスホイール
//   スマートフォン : 指2本ピンチアウト / イン
// [移動]
//   PC : SHIFT + マウスドラッグ
//   スマートフォン : 指2本フリック
//
// スクロール時に邪魔になる場合は下記1行をコメントアウトしてください。
CriLaFw.swipeZoom = true;

CriLaFw.memoryReduction = true;

// スクロールイン自動再生機能で、再生開始／停止位置を調整する設定です。
// CriLaFw.setScrollInViewMargin(head_margin, tail_margin);
// head_margin: 再生開始位置, tail_margin: 再生終了位置（順方向スクロールの場合）
// 要素の縦幅との割合を指定します。単位はパーセントです。
//   0: 要素が少しでも画面に表示されていれば再生
//  50: 要素が半分画面に表示されていれば再生（デフォルト：Facebook iOSアプリと同等）
// 100: 要素の全体が画面に表示されていれば再生
// それ以上: より画面中央までスクロールする必要があります
// 負の値: より画面外にあっても再生されます
CriLaFw.setScrollInViewMargin(50, 50);

// スワイプ動画のみに対応している、スワイプ時にページスクロールが発生しないようにする変数
// タブレット端末の横持ち、縦持ちで切り替えが必要になる。
CriLaFw.preventScroll = false;


// 大量の動画をページにおいても安定して再生する機能です
// ビューポートと動画との距離を設定し、距離の範囲内に入った動画から読み込みます。
// CriLaFw.setResourceLoadScrollInMargin(distance);
// 読み込み開始のマージンを動画とビューポートの距離で指定します。単位はピクセルです。
// 下記コメントを外すと有効になります。
// CriLaFw.setResourceLoadScrollInMargin(100)
// 読み込みを保持しておく動画の数を設定します。
// CriLaFw.setLoadQueueSize(3)

// GAへイベントを送信
CriLaFw.sendAnalytics = function(player, event_action)
{
    // GAに再生イベントを送信するサンプル
    if(typeof (gtag) == "function")
    {
        var scene_name = player.getCurrentSceneName();
        gtag('event', event_action, {'event_category': 'LiveAct(R) PRO', 'event_label': scene_name, 'value':0, 'non_interaction': true });
    }
    // 旧版のGAにイベントを送信するサンプル
    else if (typeof (ga) == "function") {
        var scene_name = player.getCurrentSceneName();
        ga('send', 'event', 'LiveAct(R) PRO', event_action, scene_name, 0, { 'nonInteraction': 1 });
    }
    else if (typeof (_gaq) == "object" && _gaq !== null) {
        if(typeof (_gaq.push) == "function"){
            var scene_name = player.getCurrentSceneName();
            _gaq.push(['_trackEvent', 'LiveAct(R) PRO', event_action, scene_name, 0, true]);
        }

    }
}

// 再生開始のイベントを送付する関数
CriLaFw.playCounted = function (player) {
    // 累計再生数の取得するサンプル
    //var count = CriLaFw.getPlayCount();
    CriLaFw.sendAnalytics(player, 'la-play');

}

// 動画の終端イベントを送付する関数
CriLaFw.endCounted = function (player) {
    CriLaFw.sendAnalytics(player, 'la-play-end');
}
//
CriLaFw.galleryDiv = null;
CriLaFw.modalGalleryDiv = null;


CriLaFw.isTablet = false;
CriLaFw.isMobile = false;
CriLaFw.isOpenModalWindow = false;

// プレイヤーのセットアップを行います
// デフォルトの動作に加えて、何か行いたいときに使用します
CriLaFw.setupPlayer = function (player) {

    var parent_div = CriLaFw.getParentDivByPlayer(player);
    var movie_id = parent_div.getAttribute('data-movie-id');

    var enlarge_button = new CriLaPlayerControlButton("lac-user-button1");
    var enlarge_button_name = "enlargeButton";

    function enlarge_button_func (){
        CriLaFw.isOpenModalWindow = true;
        open360Modal(movie_id);

        var is_sp = isSP();
        var is_landscape = isLandscape();
        if(is_sp && !is_landscape && !CriLaFw.isTablet && CriLaFw.isMobile) return;

        setModalControl();
        window.resetModalPlayerList();

    };

    // ボタンにイベントリスナを登録します。
    enlarge_button.addEventListener("click", enlarge_button_func);

    // ボタンをプレーヤに登録します。
    player.addComponent(enlarge_button_name, enlarge_button);

    player.addEventListener("canplay",function(){
      setLuminanceFunc(player); // オートルミナンスアジャストの付与
    });

};

// ルミナンスアジャスト機能の追加
function setLuminanceFunc(player)
{
    if(player instanceof CriLaPlayerWebGL && player.getLuminanceAdjustMode()) {
        var luminance_button = new CriLaPlayerControlButton('lac-luminance');
        var luminance_button_name = "luminanceButton";
        var adjustSpeed = player.getLuminanceAdjustSpeed();
        // 'auto'から'manual'時のアニメーション用の処理
        function smoothManualChange(currentValue) {
            clearTimeout(smoothManualChange);
            if(currentValue < 0.99) {
                currentValue += 0.01;
            } else if(currentValue > 1.01) {
                currentValue -= 0.01;
            } else if (0.99 <= currentValue <= 1.01) {
                player.setLuminanceAdjustExposureValue(1);
                return;
            }
            setTimeout(function() {
                player.setLuminanceAdjustExposureValue(currentValue);
                smoothManualChange(currentValue);
            }, adjustSpeed);
        };
        // ボタンを押したときの処理
        function luminance_button_func (player, ev){
            ev.preventDefault();
            if((player.getLuminanceAdjustMode()) === 'auto') {
                player.setLuminanceAdjustMode('manual');
                var cur = player.getLuminanceAdjustExposureValue();
                smoothManualChange(cur);
                player.controlWrapperElem_.parentNode.classList.remove('-auto');
            } else {
                player.setLuminanceAdjustMode('auto');
                player.controlWrapperElem_.parentNode.classList.add('-auto');
            }
        };
        // ボタンにイベントリスナを登録します。
        luminance_button.addEventListener("click", luminance_button_func.bind(this, player));
        // ボタンをプレーヤに登録します。
        player.addComponent(luminance_button_name, luminance_button);
    }
}

// SPの判定
function isSP()
{
  if(window.matchMedia("(max-width:768px)").matches)
  {
     return true;
  }
  return false;
}

// ランドスケープの判定
function isLandscape()
{
  if(window.matchMedia("(orientation:landscape)").matches)
  {
    return true;
  }

  return false;

}

// 通常表示のUIを設定する。
function setNormalControl()
{
   var num_player = CriLaFw.getNumPlayer();
    for(var i = 0; i < num_player;i++)
    {
        var player = CriLaFw.getPlayerByIndex(i);
        player.setControlStyle({"enlargeButton":true});
        switchControlCalssName(player, false);
    }

    var gallery_div = getGalleryDiv();
    requestAppendLiveActPlayer(gallery_div);
}

// モーダル表示のUIを設定する。
function setModalControl()
{
    var num_player = CriLaFw.getNumPlayer();
    for(var i = 0; i < num_player;i++)
    {
        var player = CriLaFw.getPlayerByIndex(i);
        player.setControlStyle({"enlargeButton":false});
        switchControlCalssName(player, true);
    }

    var modal_gallery_div = getModalGalleryDiv();
    requestAppendLiveActPlayer(modal_gallery_div);
}


//---------------------------------------------
// モーダル、非モーダルのCSSクラス名を切り替える
//---------------------------------------------
function switchControlCalssName(opt_player, to_modal)
{
    function getGyroDiv(element)
    {
        var ret = element.getElementsByClassName("lac-gyro-sensor__modal");
        if(ret.length > 0) return ret[0];

        ret = element.getElementsByClassName("lac-gyro-sensor");
        if(ret.length > 0) return ret[0];

        return null;
    }

    function getMainContorolDiv(element)
    {
       var ret = element.getElementsByClassName("liveact-controls--swipe__modal");
       if(ret.length > 0) return ret[0];

       ret = element.getElementsByClassName("liveact-controls--swipe");
       return ret[0];
    }

    var canvas = opt_player.getCanvas();
    var parent_div = CriLaFw.getParentDivByPlayer(opt_player);

    var control_div = getMainContorolDiv(parent_div);
    var gyro = getGyroDiv(control_div);
    if(to_modal){
        control_div.className = "liveact-controls__modal liveact-controls--swipe__modal";
        if(gyro!= null){
           gyro.style.right = "";
           gyro.style.left = "10px";
           gyro.style.top = "5px";
        }
     }
     else{
         control_div.className = "liveact-controls liveact-controls--swipe";
         if(gyro!= null){
            gyro.style.right = "60px";
            gyro.style.left = "";
            gyro.style.top = "";
         }
     }
}

// ZOOMボタンの表示、非表示を更新
function updateZoomButton()
{
    var is_sp = isSP();
    var num_player = CriLaFw.getNumPlayer();
    for(var i = 0; i < num_player;i++)
    {
        var player = CriLaFw.getPlayerByIndex(i);
        player.setControlStyle({"zoom":!is_sp});
    }
}


//---------------------------------------------------------------------
// リサイズイベント
// ZOOMボタンの表示非表示切り替えと
// SPモーダル表示のとき、LiveActのアイコン表示を切り替える。
//---------------------------------------------------------------------
function criResizeWindow()
{
    // タブレットの検出
    if(window._ua)
    {
            CriLaFw.isTablet = window._ua.Tablet;
            CriLaFw.isMobile = window._ua.Mobile;
    }

    // 動画が読めていないときは、再度読み込む
    var la_player = CriLaFw.getPlayerByIndex(0);
    if(la_player == null)
    {
        setTimeout(criResizeWindow, 100);
        return;
    }

    // ZOOMボタンの表示更新
    updateZoomButton();

    var is_open_modal_window = CriLaFw.isOpenModalWindow;
    var is_landscape = isLandscape();
    // モーダルかつスマートフォンの場合、横持ち、縦持ちでDOMの位置を変更する
    if(is_open_modal_window && CriLaFw.isMobile && !CriLaFw.isTablet)
    {
        if(is_landscape)
        {
            setModalControl();
            window.resetModalPlayerList();
        }
        else
        {
            setNormalControl();
        }
    }

    if(CriLaFw.isTablet)
    {
        if(is_landscape)CriLaFw.preventScroll=true;
        else CriLaFw.preventScroll=false;
    }
    else if(!CriLaFw.isMobile)
    {
        CriLaFw.preventScroll=true;
    }
    else
    {
        CriLaFw.preventScroll=false;
    }


}


//-----------------------
// プログレスバーを進める
//-----------------------
function loadingEvent()
{
    var loader = document.getElementById("gallery-loader");
    var progress_bar = document.getElementById("gallery-loader-progress-bar");
    if(loader == null){return;}
    var progress_count = 0;

    // 進捗バーの終了処理
    function finishProgress()
    {
        // 全天球静止画の再生処理
        var num = CriLaFw.getNumPlayer();
        for (var i = 0; i < num; ++i) {
            var player = CriLaFw.getPlayerByIndex(i);
            if (!(player instanceof CriLaPlayer)) {
                player.play();
            }
        }
        criResizeWindow();
        loader.style.display = "none";
    }

    // 進捗バーを実際に増やしている関数
    function updateProgress()
    {
        // DOM最上部の動画を対象にする
        var la_player = CriLaFw.getPlayerByIndex(0);
        if(!la_player)
        {
            // 動画の読み込みがキックされていなければ、再度本関数を呼び出す。
            setTimeout(updateProgress,400);
            return;
        }

        // 動画が再生できるか確認
        if(la_player.canPlayCurrentScene())
        {
            // 再生できる場合は、進捗を100にして
            // 表示を消す関数を時間差で呼び出す。
            progress_bar.style.width = "100%";
            setTimeout(finishProgress,200);
            return;
        }

        // 再生できない場合は、0.5%ずつ進める。
        progress_bar.style.width = progress_count +"%";
        progress_count+=0.5;
        // 90以上にならないようにクランプ
        if(progress_count > 90)progress_count=90;

        // 再度本関数を呼び出す
        setTimeout(updateProgress,200);

    }

    updateProgress();

}


// isOpenModalWindowはLiveActのボタン経由でtrueになるため、getGalleryDiv,
// getModalGalleryDivはnullにならない
function requestAppendLiveActPlayer(dest_elem)
{
    var num_player = CriLaFw.getNumPlayer();
    for(var i = 0; i < num_player;i++)
    {
        var parent_div = CriLaFw.getParentDivByIndex(i);
        $(dest_elem).append(parent_div);
        var p = CriLaFw.getPlayerByIndex(i);
        if (p.resizeFromParentElement) p.resizeFromParentElement();
    }

}


// 通常表示でLiveActのDivタグを移す先を取得する
function getGalleryDiv()
{
   if(CriLaFw.galleryDiv == null)
   {
     CriLaFw.galleryDiv = document.getElementById("gallery__liveact");
   }

   return CriLaFw.galleryDiv;
}


// モーダル表示でLiveActのDivタグを移す先を取得する
function getModalGalleryDiv()
{
   if(CriLaFw.modalGalleryDiv == null)
   {
     CriLaFw.modalGalleryDiv = document.getElementById("modal-gallery__liveact");
   }

   return CriLaFw.modalGalleryDiv;
}

// 360終了用イベントハンドラ
function close360ModalEvent()
{
    setNormalControl();
    window.close360Modal();
    CriLaFw.isOpenModalWindow = false;
}


window.addEventListener("resize",function(){criResizeWindow();});
loadingEvent();


// LiveAct(R) PRO PlayerとDOMの並列読み込み
CriLaFw.startParallelLoad();
// 上記1行をコメントアウトすると、
// DOMの読み込みが完了してから、動画の読み込みを行うようになります。
// この場合、data-load-priorityを基準として読み込みが行われます。
// 詳細はマニュアルを参照してください。

$(function() {
   criResizeWindow();
});


// ----------------------------------------
// フレームワークのコードの開始
// ----------------------------------------
CriLaEventDispatcher.ready(CriLaFw.initialize);
