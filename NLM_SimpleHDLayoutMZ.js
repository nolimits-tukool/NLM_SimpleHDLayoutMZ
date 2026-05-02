/*==========================================================================
 NLM_SimpleHDLayoutMZ.js
----------------------------------------------------------------------------
 (C)2026 NoLimits
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0  2026/03/10　初稿
============================================================================*/

/*:
 * @target MZ
 * @plugindesc シンプルなHDレイアウト・プラグイン (v1.0.0)
 * @author ノリミツ (NoLimits)
 * @url https://github.com/nolimits-tukool
 * 
 * @orderAfter HDLayout
 * 
 * @param forcedHD
 * @text HD強制
 * @desc 1280×720ドットのレイアウトへ強制変更する（デフォルト：ON）　（OFFにすると「システム2」で設定した値になる）
 * @type boolean
 * @default true
 * 
 * @param gaugeW
 * @text ゲージ幅
 * @desc ゲージ幅（デフォルト：160、ツクールデフォ：128）　　　　　　　（HDLayout.jsより こちらが優先設定される）
 * @type number
 * @min 1
 * @default 160
 * 
 * @param gaugeH
 * @parent gaugeW
 * @text ゲージ高
 * @desc ゲージ高（デフォルト：15、ツクールデフォ：12、最大：24）
 * @type number
 * @min 1
 * @max 24
 * @default 15
 * 
 * @param systemColor
 * @text システム文字色
 * @desc メニューステータスでのシステム文字色番号　　　　　　　　（デフォルト：29、ツクールデフォ：16）
 * @type color
 * @default 29
 * 
 * @param gauge3D
 * @parent gaugeW
 * @text ゲージ立体視化
 * @desc ゲージを立体的に視覚表示するか　　　　　　　　　　　　　（デフォルト：ON、ツクールデフォ：OFF)
 * @type boolean
 * @default true
 * 
 * @param menuType
 * @text メニュータイプ
 * @desc メニュー画面タイプ（デフォルト：2列化_拡大顔画像）　　　（「変更なし」にすると他のプラグインと競合しにくい）
 * @type select
 * @option 変更なし
 * @value noChange
 * @option 2列化_拡大顔画像
 * @value face
 * @option 2列化_立ち絵（ActorPictures.js要）
 * @value picture
 * @option 2列化_カード画（NLM_CardLayoutMZ.js要）
 * @value card
 * @default face
 * 
 * @param menuRows
 * @parent menuType
 * @text メニュー行数
 * @desc メニューの行数（アクターの縦人数：1～4）（デフォルト：3）（ 0 の時は1画面1人となる）
 * @type number
 * @max 4
 * @default 3
 * 
 * @param statusType
 * @text ステータスタイプ
 * @desc ステータス画面タイプ（デフォルト：右_拡大顔画像）　　　　（「変更なし」にすると他のプラグインと競合しにくい）
 * @type select
 * @option 変更なし
 * @value noChange
 * @option 中央寄せ
 * @value center
 * @option 右_拡大顔画像
 * @value face
 * @option 右_立ち絵（ActorPictures.js要）
 * @value picture
 * @option 右_カード画（NLM_CardLayoutMZ.js要）
 * @value card
 * @default face
 * 
 * @param itemCols
 * @text アイテムリスト列数
 * @desc アイテムリストの列数（デフォルト：3、ツクールデフォ：2）（NLM_CardLayoutMZ.js設定が優先される）
 * @type number
 * @min 1
 * @default 3
 * 
 * @param skillCols
 * @text スキルリスト列数
 * @desc スキルリストの列数（デフォルト：3、ツクールデフォ：2）　（NLM_CardLayoutMZ.js設定が優先される）
 * @type number
 * @min 1
 * @default 3
 * 
 * @param enemyCols
 * @text 敵リスト列数
 * @desc 戦闘時の敵リスト列数（デフォルト：3、ツクールデフォ：2）（NLM_CardLayoutMZ.js設定が優先される）
 * @type number
 * @min 1
 * @default 3
 * 
 * @param eNameCenter
 * @text 敵名前の中央寄せ
 * @desc 戦闘時の敵名前を中央寄せして表示（デフォルト：ON）
 * @type boolean
 * @default true
 * 
 * @param saveCols
 * @text セーブリスト列数
 * @desc セーブリストの列数（デフォルト：2、ツクールデフォ：1）　（AltSaveScreen.js併用時は無効）
 * @type number
 * @min 1
 * @default 2
 * 
 * @param shopCols
 * @text 店商品リスト列数
 * @desc ショップ画面の商品リストの列数　　　　　　　　　　　　　（デフォルト：2、ツクールデフォ：1）
 * @type number
 * @min 1
 * @default 2
 * 
 * @param changeEquip
 * @text 装備画面変更
 * @desc 装備画面の変更実行（デフォルト：ON）　　　　　　　　　　（OFFにすると他のプラグインと競合しにくい）
 * @type boolean
 * @default true
 * 
 * @param equip2slot
 * @parent changeEquip
 * @text 装備スロット2列化
 * @desc 装備スロットを2列化するか（デフォルト：OFF）
 * @type boolean
 * @default false
 *
 * @param battleStatus
 * @text 戦闘ステータス調整
 * @desc 戦闘ステータスで中央寄せ表示と下記コマンド幅を調整実行　（デフォルト：ON）（OFF時は他プラグインと競合しにくい）
 * @type boolean
 * @default true
 * 
 * @param battleCommandWidth
 * @parent battleStatus
 * @text 戦闘コマンド幅
 * @desc 戦闘コマンドウインドウの幅（デフォルト：280、ツクールデフォ：192）（HDLayout.jsより こちらが優先設定される）
 * @type number
 * @default 280
 * 
 * @param svHomeChange
 * @text SVアクター座標変更
 * @desc 戦闘SVアクターのホーム位置の座標を変更（デフォルト：ON）（OFF時は下記座標は無効）（他プラグイン競合時はOFFに）
 * @type boolean
 * @default true
 * 
 * @param battleSvX
 * @parent svHomeChange
 * @text 先頭SVアクターX座標
 * @desc 戦闘画面で先頭SVアクター初期位置のX座標　　　　　　　　　（デフォルト：940、ツクールデフォ：600）
 * @type number
 * @default 940
 * 
 * @param battleSvDx
 * @parent svHomeChange
 * @text SVアクターX間隔
 * @desc 戦闘画面でSVアクター同士のX座標間隔　　　　　　　　　　　（デフォルト：48、ツクールデフォ：32）
 * @type number
 * @default 48
 * 
 * @param battleSvY
 * @parent svHomeChange
 * @text 先頭SVアクターY座標
 * @desc 戦闘画面で先頭SVアクター初期位置のY座標　　　　　　　　　　(デフォルト：320、ツクールデフォ：280)
 * @type number
 * @default 320
 * 
 * @param battleSvDy
 * @parent svHomeChange
 * @text SVアクターY間隔
 * @desc 戦闘画面でSVアクター同士のY座標間隔　　　　　　　　　　　（デフォルト：62、ツクールデフォ：48）
 * @type number
 * @default 64
 * 
 * @param battleSvFw
 * @text SVアクター前進距離
 * @desc 戦闘画面でSVアクターの前進距離（デフォルト：48）
 * @type number
 * @default 48
 * 
 * @param shortenMessage
 * @text メッセージ幅縮小
 * @desc 全メッセージウインドウの幅を縮小するか（デフォルト：ON）（選択肢位置も調整。OFF時は他プラグインと競合しにくい)
 * @type boolean
 * @default true
 * 
 * @param messageWidth
 * @parent shortenMessage
 * @text メッセージ幅
 * @desc メッセージウインドウ幅（デフォルト：840、ツクールデフォ：画面最大幅）（上記ON時はHDLayout.jsより優先設定される）
 * @type number
 * @default 840
 * 
 * 
 * @help
 * 
 * 【RPGツクールMZ専用プラグイン】
 * シンプルなHDレイアウト（1280 × 720 ドット）へ各種メニューを最適化します
 *   画面サイズを入力し直さなくても、HDサイズへ強制する機能があるので、以前作成
 * した作品や「ベーシック＋マップセット」などへも手軽に導入できます
 * 
 * 《「ベーシック＋HDレイアウト」に付属する HDLayout.js との違い 》
 *  ・メニュー画面：使い慣れた右縦コマンド欄に、アクター欄が2列のシンプルな構成
 * 　　　　　　　　　　　　　　　　　　　　　　　　（アクターの縦人数は調整可）
 *  ・ステータス画面：従来型ステータス画面そのままに右側画像ウインドウを追加
 * 　※ アクター画像は「拡大顔画像」が標準で描画されますが、ActorPictures.js
 * 　　 （「ベーシック＋HDレイアウト」で標準実装）を併用で「立ち絵」を、
 * 　　　NLM_CardLayoutMZ.js を併用で「カード画」を、置き換えて描画できます
 * 
 * また、単独で以下の機能を持ち、HDLayout.jsと同時併用でも機能を追加できます
 * 　・ゲージの幅の他に、高さの変更、ゲージの立体視化が可能
 * 　・システム文字色の変更
 * 　・アイテム、スキル、セーブ、ショップの各リストの列数変更
 * 　・装備スロットの2列化
 * 　・敵リストの列数変更と敵名前の中央寄せ表示
 * 　・戦闘ステータスで4人以下の際の中央寄せ表示
 * 　・SVアクター間のX間隔・Y間隔の変更、前進距離の変更
 * 　・メッセージウインドウの幅変更の他に、選択肢をウインドウの端にそろえる機能
 * 【注意】
 * 　・HDLayout.jsを同時併用する際は,本プラグインより上に配置して下さい
 * 　・HDLayout.jsの画面構成を優先したい際や、他の画面構成を改変するプラグイン
 * 　　 と競合する際は本プラグインのパラメータの該当箇所を「変更なし」、「OFF」
 * 　　 「ツクールデフォ値」に設定してみて下さい
 * 　　　（※ 競合を完全には回避できない場合もある点は御了承ください）
 * 　・起動時のちらつきが気になる時やゲーム投稿時は、データベース「システム2」
 * 　　　の 画面の幅・UIの幅を1280へ、画面の高さ・UIの高さを720へ直して下さい
 * 
 * コマンドの高さも変更したい場合は NLM_CommandHeightMZ.js の併用をお勧めします
 * 
 * プラグインコマンドはありません
 * 利用規約はMITライセンスの通りです
 */

(() => {
  "use strict";

  const pluginName = "NLM_SimpleHDLayoutMZ";
  const NLWMparam  = PluginManager.parameters(pluginName);
  NLWMparam.gaugeW = Number(NLWMparam.gaugeW) || 128;
  NLWMparam.gaugeH = Number(NLWMparam.gaugeH) || 12;
  NLWMparam.systemColor = Number(NLWMparam.systemColor) || 0;
  NLWMparam.menuRows    = parseInt(NLWMparam.menuRows)  || 0;
  NLWMparam.itemCols    = parseInt(NLWMparam.itemCols)  || 2;
  NLWMparam.skillCols   = parseInt(NLWMparam.skillCols) || 2;
  NLWMparam.enemyCols   = parseInt(NLWMparam.enemyCols) || 2;
  NLWMparam.saveCols    = parseInt(NLWMparam.saveCols)  || 1;
  NLWMparam.shopCols    = parseInt(NLWMparam.shopCols)  || 1;
  NLWMparam.battleSvX   = Number(NLWMparam.battleSvX)   || 940;
  NLWMparam.battleSvDx  = Number(NLWMparam.battleSvDx)  || 48;
  NLWMparam.battleSvY   = Number(NLWMparam.battleSvY)   || 320;
  NLWMparam.battleSvDy  = Number(NLWMparam.battleSvDy)  || 62;
  NLWMparam.battleSvFw  = Number(NLWMparam.battleSvFw)  || 0;
  NLWMparam.messageWidth       = Number(NLWMparam.messageWidth)       || 840;
  NLWMparam.battleCommandWidth = Number(NLWMparam.battleCommandWidth) || 192;

  // パラメータ引継ぎ (NLM_CardLayoutMZ.js)
  const NLCLparam = PluginManager.parameters("NLM_CardLayoutMZ");

  let NLWM_ActorPictures = false;
  let NLWM_HDLayout      = false;
  let NLWM_AltSaveScreen = false;

  $plugins.forEach((plugin) => { // プラグイン併用のチェック
    if (plugin.name === "ActorPictures" && plugin.status) {
      NLWM_ActorPictures = true;
    }
    if (plugin.name === "HDLayout" && plugin.status) {
      NLWM_HDLayout = true;
    }
    if (plugin.name === "AltSaveScreen" && plugin.status) {
      NLWM_AltSaveScreen = true;
    }
  });

  // 隠しパラメータ
  DataManager._NLWMstatusWwidth  = 816;  // ステータスウインドウの幅
  DataManager._NLWMstatusNoFace  = false;// ステータス左の顔画像消去
  DataManager._NLWMstatusPwidth  = 300;  // ステータス能力値の幅
  DataManager._NLWMenlargeSparam = 2;    // ステータス能力値の拡大行数
  DataManager._NLWMstatusMarginX = 20;   // ステータス画像の余白X座標
  DataManager._NLWMstatusMarginY = 20;   // ステータス画像の余白Y座標
  DataManager._NLWMenlargeImage  = true; // 立ち絵の拡大許可
  DataManager._NLWMequipWidth    = 416;  // 装備能力値の幅
  DataManager._NLWMequipItemCols = 2;    // 装備アイテムリスト列数
  DataManager._NLWMstateIconDown = false;// メニューステートアイコンの下面化
  DataManager._NLWMstateIconX    = 0;    // メニューステートアイコン補正X座標
  DataManager._NLWMstateIconY    = 0;    // メニューステートアイコン補正Y座標
  DataManager._NLWMnoClass       = false;// メニュー画面で職業を常に非描画
  DataManager._NLWMcardCursol    = true; // メニューカード画時のカーソル上面化
  DataManager._NLWMbattleCenter  = true; // 戦闘ステータスの中央寄せ許可
  DataManager._NLWMchoiceListX   = true; // 選択肢リストX座標の変更許可

  // HD画面へ強制変更
  if (NLWMparam.forcedHD === "true") {
    const _DM_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
      const result = _DM_isDatabaseLoaded.call(this);
      if (result && !this._NLWMfirst) {
        $dataSystem.advanced.screenWidth  = 1280;
        $dataSystem.advanced.uiAreaWidth  = 1280;
        $dataSystem.advanced.screenHeight = 720;
        $dataSystem.advanced.uiAreaHeight = 720;
        this._NLWMfirst = true;
      }
      return result;
    };
  }

  // ステータス文字システム色変更
  if (NLWMparam.systemColor !== 16) {
    ColorManager.systemColor = function() {
      return this.textColor(NLWMparam.systemColor);
    };
  }

  // 顔画像の拡大処理
  Window_StatusBase.prototype.NLWMdrawFace = function(actor, x, y, w, h) {
    const faceName  = actor.faceName();
    const faceIndex = actor.faceIndex();
    const bitmap = ImageManager.loadFace(faceName);
    const sw  = ImageManager.faceWidth;
    const sh  = ImageManager.faceHeight;
    const sx  = Math.floor((faceIndex % 4) * sw);
    const sy  = Math.floor(Math.floor(faceIndex / 4) * sh);
    const dw  = Math.min(w, h);
    const dx  = Math.floor(x + (w - dw) / 2);
    const dy  = Math.floor(y + (h - dw) / 2);
    this.contents.blt(bitmap, sx+1, sy+1, sw-2, sh-2, dx, dy, dw, dw);
  };

  // 立ち絵描画（ActorPictures.jsの関数を利用）
  Window_StatusBase.prototype.NLWMdrawPicture = function(actor, x, y, w, h) {
    if (NLWM_ActorPictures) {
      const pictureName = actor.pictureName();
      const bitmap = ImageManager.loadPicture(pictureName);
      bitmap.addLoadListener(function() {
        const bw = bitmap.width;
        const bh = bitmap.height;
        const sx = w > bw ? Math.floor((w - bw) / 2) : 0;
        const sy = h > bh ? Math.floor((h - bh) / 2) : 0;
        if (!sx || !sy || !DataManager._NLWMenlargeImage) {
          this.drawActorPicture(actor, x + sx, y + sy, w, h, true, true);
        } else { // ウインドウより立ち絵が小さい時は拡大して描画
          const ar = bh / bw < h / w ? w / bw : h / bh;
          const ew = Math.floor(bw * ar);
          const eh = Math.floor(bh * ar);
          const ex = Math.floor((w - ew) / 2);
          const ey = Math.floor((h - eh) / 2);
          const oy = Math.floor(ImageManager.offsetY(pictureName) * ar);
          this.contents.blt(bitmap, 0, 0, bw, bh, x + ex, y + ey + oy, ew, eh);
        }
      }.bind(this));
    }
  };

  // カード描画（NLM_CardLayoutMZ.jsの関数を利用）
  Window_StatusBase.prototype.NLWMdrawCard = function(actor, x, y, w, h) {
    if ($gameSystem._isNLMcardLayout) {
      const rect = new Rectangle(x, y, w, h);
      this.drawCardItem(actor, 5, 6, rect);
    }
  };

  // 画像描画選別
  Window_StatusBase.prototype.NLWMcorrectType = function(type) {
    const eva = (type === "picture" && NLWM_ActorPictures) ||
                (type === "card" && $gameSystem._isNLMcardLayout);
    return eva ? type : "face";
  }

  Window_StatusBase.prototype.NLWMdrawItemImage = function(menu, actor, x, y, w, h) {
    const enabled = this.isEnabled(actor);
    const type    = this._NLWMimageType;
    switch(type) {
      case "picture":
        if (menu) this.changePaintOpacity(enabled);
        this.NLWMdrawPicture(actor, x, y, w, h);
        break;
      case "card":
        this.NLWMdrawCard(actor, x, y, w, h);
        break;
      default:
        if (menu) this.changePaintOpacity(enabled);
        this.NLWMdrawFace(actor, x, y, w, h);
        break;
    }
  };

  // NLM_CardLayoutMZ.js対策
  Window_StatusBase.prototype.isEnabled = function(actor) {
    return actor.isBattleMember();
  };

  const _Window_MenuStatus_initialize = Window_MenuStatus.prototype.initialize;
  Window_MenuStatus.prototype.initialize = function() {
    _Window_MenuStatus_initialize.apply(this, arguments);
    this._NLWMimageType = this.NLWMcorrectType(NLWMparam.menuType);
  };

  const _Window_MenuStatus_drawItem = Window_MenuStatus.prototype.drawItem;
  Window_MenuStatus.prototype.drawItem = function(index) {
    _Window_MenuStatus_drawItem.apply(this, arguments);
    if (this._NLWMimageType === "card" && DataManager._NLWMcardCursol) {
      this._clientArea.addChild(this._cursorSprite); // カーソルを上面に再描画
    }
  };

  // メニュー画面の2列化
  if (NLWMparam.menuType !== "noChange") {
    Scene_Menu.prototype.commandWindowRect = function() { // デフォルトに戻す
      const ww = this.mainCommandWidth();
      const wh = this.mainAreaHeight() - this.goldWindowRect().height;
      const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
      const wy = this.mainAreaTop();
      return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Menu.prototype.statusWindowRect = function() { // デフォルトに戻す
      const ww = Graphics.boxWidth - this.mainCommandWidth();
      const wh = this.mainAreaHeight();
      const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
      const wy = this.mainAreaTop();
      return new Rectangle(wx, wy, ww, wh);
    };

    Window_MenuCommand.prototype.maxCols = function() { // コマンドを1列に戻す
      return 1;
    };

    Window_MenuStatus.prototype.maxCols = function() { // ステータス列数変更
      return NLWMparam.menuRows ? 2 : 1;
    };

    Window_MenuStatus.prototype.numVisibleRows = function() { // ステータス行数
      return NLWMparam.menuRows || 1;
    };

    Window_MenuStatus.prototype.drawItemImage = function(index) {
      const actor = this.actor(index);
      const rect  = this.itemRect(index);
      const m  = this.NLWMimageMargin();
      const x  = rect.x + 2 + m;
      const y  = rect.y + 2 + m;
      const w  = this.NLWMimageWidth(rect.width) - m * 2;
      const h  = rect.height - 4 - m * 2;
      const ix = rect.x + this.NLWMstateIconX(w);
      const iy = rect.y + this.NLWMstateIconY(rect.height)
      this.NLWMdrawItemImage(true, actor, x, y, w, h);
      this.changePaintOpacity(true);
      this.drawActorIcons(actor, ix, iy, w); // アイコンを重ねる
    };

    Window_MenuStatus.prototype.drawItemStatus = function(index) {
      const actor = this.actor(index);
      const rect  = this.itemRectWithPadding(index); 
      const lineHeight = this.lineHeight();
      const g = (NLWMparam.menuRows > 3 || DataManager._NLWMnoClass) ? 2 : 3;
      const r = g === 3 ? 2.5 : 2;
      const x = rect.x + this.NLWMimageWidth(rect.width) + 30;
      const y = rect.y + Math.floor(rect.height / 2 - lineHeight * r);
      this.drawActorName(actor, x, y);
      this.drawActorLevel(actor,   x, y + lineHeight * 1);
      if (g === 3) { // 3行以下のみActorClass描画
        this.drawActorClass(actor, x, y + lineHeight * 2);
      }
      this.placeBasicGauges(actor, x, y + lineHeight * g);
    };

    Window_MenuStatus.prototype.NLWMimageMargin = function() {
      const card = this._NLWMimageType === "card";
      const row4 = NLWMparam.menuRows > 3;
      return card ? (row4 ? 4 : 14) : 0;
    };

    Window_MenuStatus.prototype.NLWMimageWidth = function(width) {
      return width - NLWMparam.gaugeW - 60;
    };

    Window_MenuStatus.prototype.NLWMstateIconX = function(w) {
      return 6 + DataManager._NLWMstateIconX;
    };

    Window_MenuStatus.prototype.NLWMstateIconY = function(h) {
      const margin = NLWMparam.menuRows < 3 ? 4 : 0;
      const dy = h - margin - ImageManager.iconHeight - 4;
      const cy = DataManager._NLWMstateIconDown ? dy : margin;
      return cy + DataManager._NLWMstateIconY;
    };
  }

  const _WMS_refreshCursorForAll = Window_MenuStatus.prototype.refreshCursorForAll;
  Window_MenuStatus.prototype.refreshCursorForAll = function() { // 全体スキルでのカーソル修正
    const maxItems = this.maxItems();
    const cols     = this.maxCols();
    if (maxItems > cols && maxItems % cols) {
      const rect = this.itemRect(0);
      rect.enlarge(this.itemRect(maxItems + cols - 1 - maxItems % cols));
      this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
    } else {
      _WMS_refreshCursorForAll.apply(this, arguments);
    }
  };

  // ステータス画面変更
  if (NLWMparam.statusType !== "noChange") {
    const _Scene_Status_initialize = Scene_Status.prototype.initialize;
    Scene_Status.prototype.initialize = function() {
      _Scene_Status_initialize.apply(this, arguments);
      const center = NLWMparam.statusType === "center";
      this._NLWMsw = DataManager._NLWMstatusWwidth;
      this._NLWMpw = center ? this._NLWMsw : Graphics.boxWidth;
      this._NLWMwx = center ? (Graphics.boxWidth - this._NLWMsw) / 2 : 0;
      this._NLWMeh = DataManager._NLWMenlargeSparam || 0;
    };

    const _SS_profileWindowRect = Scene_Status.prototype.profileWindowRect;
    Scene_Status.prototype.profileWindowRect = function() {
      const rect = _SS_profileWindowRect.call(this);
      rect.x     = this._NLWMwx;
      rect.width = this._NLWMpw;
      return rect;
    };

    Scene_Status.prototype.statusWindowRect = function() {
      const wx = this._NLWMwx;
      const wy = this.mainAreaTop();
      const ww = this._NLWMsw;
      const wh = this.statusParamsWindowRect().y - wy;
      return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Status.prototype.statusParamsWindowRect = function() {
      const ww = this.statusParamsWidth();
      const wh = this.statusParamsHeight();
      const wx = this._NLWMwx;
      const wy = this.mainAreaBottom() - this.profileHeight() - wh;
      return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Status.prototype.statusEquipWindowRect = function() {
      const ww = this._NLWMsw - this.statusParamsWidth();
      const wh = this.statusParamsHeight();
      const wx = this.statusParamsWidth() + this._NLWMwx;
      const wy = this.mainAreaBottom() - this.profileHeight() - wh;
      return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Status.prototype.statusParamsWidth = function() {
      return DataManager._NLWMstatusPwidth;
    };

    Scene_Status.prototype.statusParamsHeight = function() {
      return this.calcWindowHeight(6 + this._NLWMeh, false);
    };

    Window_Status.prototype.drawBlock2 = function() { // デフォルトに戻す
      const y = this.block2Y();
      if (!DataManager._NLWMstatusNoFace) {
        this.drawActorFace(this._actor, 12, y);
      }
      this.drawBasicInfo(204, y);
      this.drawExpInfo(456, y);
    };
  }

  if (NLWMparam.statusType !== "noChange" && NLWMparam.statusType !== "center") {
    // ステータス画面右に新たなウインドウ新設
    const _Scene_Status_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
      _Scene_Status_create.apply(this, arguments);
      this.createStatusPictureWindow();
    };

    Scene_Status.prototype.createStatusPictureWindow = function() {
      const rect = this.statusPictureWindowRect();
      this._statusPictureWindow = new Window_StatusPicture(rect);
      this.addWindow(this._statusPictureWindow);
    };

    Scene_Status.prototype.statusPictureWindowRect = function() {
      const wx = this._NLWMsw;
      const wy = this.mainAreaTop();
      const ww = Graphics.boxWidth - this._NLWMsw;
      const wh = this.mainAreaHeight() - this.profileHeight();
      return new Rectangle(wx, wy, ww, wh);
    };

    const _Scene_Status_refreshActor = Scene_Status.prototype.refreshActor;
    Scene_Status.prototype.refreshActor = function() {
      _Scene_Status_refreshActor.apply(this, arguments);
      this._statusPictureWindow.setActor(this.actor());
    };

    function Window_StatusPicture() {
      this.initialize(...arguments);
    }

    Window_StatusPicture.prototype = Object.create(Window_StatusBase.prototype);
    Window_StatusPicture.prototype.constructor = Window_StatusPicture;

    Window_StatusPicture.prototype.initialize = function(rect) {
      Window_StatusBase.prototype.initialize.call(this, rect);
      this._actor = null;
      this._NLWMimageType = this.NLWMcorrectType(NLWMparam.statusType);
    };

    Window_StatusPicture.prototype.setActor = function(actor) {
      if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
      }
    };

    Window_StatusPicture.prototype.refresh = function() {
      Window_Selectable.prototype.refresh.call(this);
      if (this._actor) {
        this.drawImage();
      }
    };

    Window_StatusPicture.prototype.drawImage = function() {
      const pic = this._NLWMimageType === "picture";
      const x = pic ? 0 : DataManager._NLWMstatusMarginX;
      const y = pic ? 0 : DataManager._NLWMstatusMarginY;
      const w = this.innerWidth  - x * 2;
      const h = this.innerHeight - y * 2;
      this.NLWMdrawItemImage(false, this._actor, x, y, w, h);
    };

    Window_StatusPicture.prototype.isEnabled = function(actor) {
      return true; // NLM_CardLayoutMZ.js対策
    };
  }

  // 装備画面の変更
  if (NLWMparam.changeEquip === "true" && NLCLparam.itemOn !== "true") {
    if (NLWM_HDLayout) { // HDLayout.js併用時はデフォルトへ戻す
      const _SE_createItemWindow = Scene_Equip.prototype.createItemWindow;
      Scene_Equip.prototype.createItemWindow = function() {
        _SE_createItemWindow.apply(this, arguments);
        this._itemWindow.hide();
      };

      Scene_Equip.prototype.helpWindowRect = function() {
        return Scene_MenuBase.prototype.helpWindowRect();
      };

      const _SE_statusWindowRect = Scene_Equip.prototype.statusWindowRect;
      Scene_Equip.prototype.statusWindowRect = function() {
        const mRect  = _SE_statusWindowRect.call(this);
        mRect.height = this.mainAreaHeight();
        return mRect;
      };

      const _SE_slotWindowRect = Scene_Equip.prototype.slotWindowRect;
      Scene_Equip.prototype.slotWindowRect = function() {
        const mRect = _SE_slotWindowRect.call(this);
        mRect.width = Graphics.boxWidth - this.statusWidth();
        return mRect;
      };

      Scene_Equip.prototype.itemWindowRect = function() {
        return this.slotWindowRect();
      };

      const _Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
      Scene_Equip.prototype.onSlotOk = function() {
        this._slotWindow.hide();
        _Scene_Equip_onSlotOk.apply(this, arguments);
      };

      Scene_Equip.prototype.hideItemWindow = function() {
        this._slotWindow.show();
        this._slotWindow.activate();
        this._itemWindow.hide();
        this._itemWindow.deselect();
      };
    } else { // HDLayout.jsがなければ、ゲージ追加
      const _Window_EquipStatus_refresh = Window_EquipStatus.prototype.refresh;
      Window_EquipStatus.prototype.refresh = function() {
        Window_StatusBase.prototype.refresh.call(this);
        _Window_EquipStatus_refresh.apply(this, arguments);
        if (this._actor) {
          this.placeBasicGauges(this._actor, 190, 80);
        }
      };
    }

    Scene_Equip.prototype.statusWidth = function() {
      return DataManager._NLWMequipWidth || 416;
    };

    const _Window_EquipStatus_paramX = Window_EquipStatus.prototype.paramX
    Window_EquipStatus.prototype.paramX = function() {
      const paramX = _Window_EquipStatus_paramX.call(this);
      return Math.floor(paramX / 5 * 3);
    };

    Window_EquipItem.prototype.maxCols = function() {
      return DataManager._NLWMequipItemCols || 2;
    };
  }

  // 装備スロット2列化
  if (NLWMparam.equip2slot === "true") {
    Window_EquipSlot.prototype.maxCols = function() {
      return 2;
    };
  }

  // 戦闘ステータス画面の変更
  if (NLWMparam.battleStatus === "true") {
    const _SB_statusWindowRect = Scene_Battle.prototype.statusWindowRect;
    Scene_Battle.prototype.statusWindowRect = function() {
      const rect = _SB_statusWindowRect.call(this);
      rect.width = Graphics.boxWidth - NLWMparam.battleCommandWidth;
      rect.x = this.isRightInputMode() ? 0 : Graphics.boxWidth - rect.width;
      return rect;
    };

    const _SB_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
    Scene_Battle.prototype.actorCommandWindowRect = function() {
      const rect = _SB_actorCommandWindowRect.call(this);
      rect.width = NLWMparam.battleCommandWidth;
      rect.x = this.isRightInputMode() ? Graphics.boxWidth - rect.width : 0;
      return rect;
    };

    const _SB_partyCommandWindowRect = Scene_Battle.prototype.partyCommandWindowRect;
    Scene_Battle.prototype.partyCommandWindowRect = function() {
      const rect = _SB_partyCommandWindowRect.call(this);
      rect.width = NLWMparam.battleCommandWidth;
      rect.x = this.isRightInputMode() ? Graphics.boxWidth - rect.width : 0;
      return rect;
    };

    if (NLCLparam.actorCentering !== "true") { // 戦闘ステータス中央寄せ
      const _WBS_itemRect = Window_BattleStatus.prototype.itemRect;
      Window_BattleStatus.prototype.itemRect = function(index) {
        const rect = _WBS_itemRect.apply(this, arguments);
        const iW   = this.innerWidth;
        const col  = this.maxCols();
        const len  = $gameParty.members().length;
        if ((len < col) && DataManager._NLWMbattleCenter) {
          rect.x += Math.floor((iW - iW / col * len) / 2);
        }
        return rect;
      };
    }

    const _WBS_basicGaugesX = Window_BattleStatus.prototype.basicGaugesX;
    Window_BattleStatus.prototype.basicGaugesX = function(rect) { // ゲージを中央寄せ
      const gx = Math.floor((rect.width - NLWMparam.gaugeW) / 2);
      return _WBS_basicGaugesX.call(this, rect) + gx;
    };

    if (!NLWM_HDLayout) {
      Scene_Skill.prototype.mainCommandWidth = function() {
        return NLWMparam.battleCommandWidth; // スキルタイプ幅も同値設定
      };
    }
  }

  // アイテムリスト列数変更
  if (NLWMparam.itemCols !== 2 && NLCLparam.itemOn !== "true") {
    Window_ItemList.prototype.maxCols = function() {
      return NLWMparam.itemCols;
    };
  }

  // スキルリスト列数変更
  if (NLWMparam.skillCols !== 2 && NLCLparam.skillOn !== "true") {
    Window_SkillList.prototype.maxCols = function() {
      return NLWMparam.skillCols;
    };
  }

  // 敵リスト列数変更
  if (NLWMparam.enemyCols !== 2 && NLCLparam.enemyOn !== "true") {
    Window_BattleEnemy.prototype.maxCols = function() {
      return NLWMparam.enemyCols;
    };
  }

  // 敵名前の中央寄せ
  if (NLWMparam.eNameCenter === "true" && NLCLparam.enemyOn !== "true") {
    Window_BattleEnemy.prototype.drawItem = function(index) {
      this.resetTextColor();
      const name = this._enemies[index].name();
      const rect = this.itemLineRect(index);
      this.drawText(name, rect.x, rect.y, rect.width, "center");
    };
  }

  // セーブリスト列数変更
  if (NLWMparam.saveCols !== 1 && !NLWM_AltSaveScreen) {
    DataManager.maxSavefiles = function() {
      const sCols = NLWMparam.saveCols;
      const sRows = Math.ceil(20 / sCols);
      return sRows < 5 ? sCols * 5 : sRows * sCols;
    };

    Window_SavefileList.prototype.maxCols = function() {
      return NLWMparam.saveCols;
    };

    Window_SavefileList.prototype.maxItems = function() {
      return DataManager.maxSavefiles();
    };

    const _WSFL_drawContents = Window_SavefileList.prototype.drawContents;
    Window_SavefileList.prototype.drawContents = function(info, rect) {
      if (rect.width < 420 && rect.width >= 180) {
        const bottom = rect.y + rect.height;
        this.drawPartyCharacters(info, rect.x + 20, bottom - 8);
      }
      _WSFL_drawContents.apply(this, arguments);
    };
  }

  // 店売リストの2列化
  if (NLWMparam.shopCols !== 1) {
    Window_ShopBuy.prototype.maxCols = function() {
      return NLWMparam.shopCols;
    };
  }

  // メッセージウインドウ幅変更
  if (NLWMparam.shortenMessage === "true") {
    const _SM_messageWindowRect = Scene_Message.prototype.messageWindowRect;
    Scene_Message.prototype.messageWindowRect = function() {
      const rect = _SM_messageWindowRect.call(this);
      rect.width = NLWMparam.messageWidth;
      rect.x     = (Graphics.boxWidth - rect.width) / 2;
      return rect;
    };

    const _WM_createDimmerSprite = Window_Message.prototype.createDimmerSprite
    Window_Message.prototype.createDimmerSprite = function() {
      _WM_createDimmerSprite.apply(this, arguments);
      this._dimmerSprite.x = (NLWMparam.messageWidth - Graphics.width) / 2;
    };

    Window_Message.prototype.refreshDimmerBitmap = function() {
      if (this._dimmerSprite) {
        const bitmap = this._dimmerSprite.bitmap;
        const w = this.width > 0 ? Graphics.width : 0;
        const h = this.height;
        const m = this.padding;
        const c1 = ColorManager.dimColor1();
        const c2 = ColorManager.dimColor2();
        bitmap.resize(w, h);
        bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
        bitmap.fillRect(0, m, w, h - m * 2, c1);
        bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
        this._dimmerSprite.setFrame(0, 0, w, h);
      }
    };

    const _Window_ChoiceList_windowX = Window_ChoiceList.prototype.windowX;
    Window_ChoiceList.prototype.windowX = function() { // 選択肢Windowの左右を調整
      const wx = _Window_ChoiceList_windowX.call(this);
      const ex = DataManager._NLWMchoiceListX &&
                 (this.windowWidth() > NLWMparam.messageWidth);
      const pt = $gameMessage.choicePositionType();
      const dx = (Graphics.boxWidth - NLWMparam.messageWidth) / 2;
      return wx + (!pt ? dx : (pt === 1 || ex) ? 0 : -dx);
    };
  }

  // SVアクターの位置調整
  if (NLWMparam.svHomeChange === "true") {
    Sprite_Actor.prototype.setActorHome = function(index) { // SVアクターのホーム位置を変更
      const bx = NLWMparam.battleSvX;
      const dx = NLWMparam.battleSvDx;
      const by = NLWMparam.battleSvY;
      const dy = NLWMparam.battleSvDy;
      this.setHome(bx + index * dx, by + index * dy);
    };

    Sprite_Actor.prototype.retreat = function() { // SVアクターの逃げる距離を調整
      const rx = Graphics.width - NLWMparam.battleSvX + 100;
      this.startMove(rx, 0, 30);
    };
  }

  // SVアクターの前進距離を変更
  if (NLWMparam.battleSvFw !== 48) {
    Sprite_Actor.prototype.stepForward = function() {
      const step = NLWMparam.battleSvFw;
      this.startMove(-step, 0, 12);
    };
  }

  // 全ゲージの変更
  if (NLWMparam.gaugeW !== 128) {
    Sprite_Gauge.prototype.bitmapWidth = function() { // ゲージの幅
      return NLWMparam.gaugeW;
    };
  }

  if (NLWMparam.gaugeH !== 12) {
    Sprite_Gauge.prototype.gaugeHeight = function() { // ゲージの高さ
      return NLWMparam.gaugeH;
    };
  }

  if (NLWMparam.gauge3D === "true") { // ゲージの立体化
    const _SG_drawGaugeRect = Sprite_Gauge.prototype.drawGaugeRect;
    Sprite_Gauge.prototype.drawGaugeRect = function(x, y, width, height) {
      _SG_drawGaugeRect.apply(this, arguments);
      const fillW = Math.floor((width - 2) * this.gaugeRate());
      const fillH = height - 2;
      this.bitmap.gradientFillRect(x + 1, y + 1, fillW, fillH / 3, 
                          "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)", true);
      this.bitmap.gradientFillRect(x + 1, y + fillH * 2 / 3 + 1, fillW, fillH / 3, 
                          "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)", true);
    };
  }
})();
