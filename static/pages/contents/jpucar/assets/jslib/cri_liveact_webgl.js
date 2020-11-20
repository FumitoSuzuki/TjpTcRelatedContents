/****************************************************************************
 *
 * LiveAct(R) PRO
 * WebGL
 *
 * (c) 2016 CRI Middleware Co., Ltd.
 * Version : 1.85.603.0
 *
 ****************************************************************************/
"use strict";var CriLaWebGL=CriLaWebGL||{};CriLaWebGL.vsCode2d=CriLaWebGL.vsCode2d||"attribute vec3 in_position;	\n	attribute vec2 in_uv;	\n	varying vec2 v_uv;	\n	\n	void main() {	\n		gl_Position = vec4(in_position, 1.0);	\n		v_uv = in_uv;	\n	}	\n	";CriLaWebGL.psCode2d=CriLaWebGL.psCode2d||"precision mediump float;	\n	varying vec2 v_uv;	\n    uniform sampler2D s_color;    \n    \n	void main() {	\n		gl_FragColor = texture2D(s_color, v_uv);  \n	}	\n    ";CriLaWebGL.vsCode3d=CriLaWebGL.vsCode3d||"uniform mat4 u_wvp_matrix;  \n	uniform vec4 u_uv_matrix[2];	\n    attribute vec3 in_position;	\n	attribute vec2 in_uv;	\n	varying vec2 v_uv;	\n	\n	void main() {	\n		gl_Position = vec4(in_position, 1.0) * u_wvp_matrix;	\n		v_uv.x = in_uv.x * u_uv_matrix[0].x + in_uv.y*u_uv_matrix[0].y + u_uv_matrix[0].w;	\n		v_uv.y = in_uv.x * u_uv_matrix[1].x + in_uv.y*u_uv_matrix[1].y + u_uv_matrix[1].w;	\n	}	\n	";CriLaWebGL.psCode3d=CriLaWebGL.psCode3d||"precision mediump float;	\n	varying vec2 v_uv;	\n    uniform sampler2D s_color;    \n    \n	void main() {	\n		gl_FragColor = texture2D(s_color, v_uv);  \n	}	\n    ";function CriLaPlayerWebGL(){CriLaMgPlayerCommon.call(this);this.gl_=null;this.canvas_=null;this.camera_=null;this.memoryReduction=false;this.timeManager_=null;this.worldMatrix_=new CriGrxMatrix();this.worldMatrix_.setIdentity();this.luminanceAdjust=null;this.luminanceAdjustPreSettings={}}(function(b,a){CriLaPolyfill.Object.setPrototypeOf(b,a);b.initialize=function(c,f){var d=new CriLaEventDispatcher(this);this.setEventDispatcher_(d);a.initialize.call(this,c,f);var g=this.Sequencer.renderer_.getContextNative();var e=new CriLaCamera(g);e.initialize(c);this.camera_=e;g.enable(g.DEPTH_TEST);g.depthFunc(g.LEQUAL);g.enable(g.CULL_FACE);g.cullFace(g.BACK);this.gl_=g};b.serveAutoPause_=function(){var c=this;window.addEventListener("blur",function(){if(!CriLiveActSharedSettings.autoPause){return}c.pause();if(this.memoryReduction&&c.isInvisible()){c.unloadDecodedData();criLiveActRelease()}});window.addEventListener("focus",function(){if(!CriLiveActSharedSettings.autoPause){return}c.play();if(this.memoryReduction&&c.isInvisible()){c.reloadDecodedData();criLiveActRelease()}})};b.serveMemoryReduction_=function(){};b.getContext=function(){return this.gl_};b.getWorldMatrix=function(){return this.worldMatrix_};b.getCamera=function(){return this.camera_};b.resizeCanvasStyle_=function(h,g){a.resizeCanvasStyle_.call(this,h,g);var d=this.getCanvas();var f=this.getCamera();var e=d.clientWidth;var c=d.clientHeight;if(e===0||c===0){e=d.width;c=d.height}f.setAspectRatio(e/c)};b.resizeCanvasAttr_=function(e,c){a.resizeCanvasAttr_.call(this,e,c);var d=this.getCamera();d.setViewport(e,c)};b.setup=function(d){var e=a.setup.call(this,d);if(!e){return false}this.timeManager_=new CriLaC00K();this.setCurrentSceneByIndex(0);this.setupPlayerSize();this.timeManager_.setup(this);var f=CriLaPolyfill.Array.find(this.resourceList,function(g){return g.type===CriLaResourceType.MODEL});if(f){}else{var c=CriLaPolyfill.Array.find(this.resourceList,function(g){return g.type===CriLaResourceType.IMAGE});if(c){this.drawPicture_(c)}}return true};b.drawPicture_=function(c){var d=this.controlWrapperElem_.style;d.backgroundImage="url("+this.getResourcesBaseURL()+c.url+")";d.backgroundSize="cover";d.backgroundPosition="center center"};b.getModel=function(){return CriLaPolyfill.Array.find(this.resourceList,function(c){return c.type===CriLaResourceType.MODEL})};b.unloadDecodedData=function(){var c=this.getModel();c.unload()};b.reloadDecodedData=function(){var c=this.getModel();c.reload()};b.fullscreenImpl_=function(c){this.resizeCanvasFill(c)};b.getCurrentSceneWidth=function(){var c=CriLaHtmlCss.getElementWidthHeight(this.getCanvas());return c.getWidth()};b.getCurrentSceneHeight=function(){var c=CriLaHtmlCss.getElementWidthHeight(this.getCanvas());return c.getHeight()};b.createRendererFromCanvas_=function(c){return new CriLaMgRendererWebGL(c,this.CriLaP11m)};b.setupResource_=function(c){c.setup({graphicsContext:this.getContext()})};b.createDrawParameter_=function(){var c=a.createDrawParameter_.call(this);c.worldMatrix=this.worldMatrix_;c.camera=this.getCamera();return c};b.getContainedLayers=function(c,e,d){return[]};b.setupLuminanceAdjust=function(g){var i=this.getContext();var d=new CriAutoLuminanceAdjust(i,g);var e=this;if(d.render_targets[0]){e.setRenderTarget(d.render_targets[0])}function c(k){var j=d.getJpegExposeDrawShaderCode();k.setSourcePS(j);k.linkProgram();k.name=d.getJpegExposeDrawShaderName();e.addEventListener("preparedraw",function(l){k.setParameterF("blend_param",d.getExposureValue())})}function h(j,m,l){var k=j=="3_texture_luminunce_adjust"?d.getThreeTextureBlendShaderCode():d.getFiveTextureBlendShaderCode();d.setupRawClampRange();m.setSourcePS(k);m.linkProgram();e.addEventListener("preparedraw",function(n){m.setParameterF("blend_param",d.getExposureValue());l.forEach(function(q,o){var p=o+1;var r="s_color_"+p;m.setSampler(p,r,q)})})}this.addEventListener("canplay",function(){var k=e.getResourceByIndex(0);var j=k.getMaterialByIndex(0);var l=j.getCriLaShader();if(l.name=="constant"){c(l)}else{h(l.name,l,k.textureList_.slice(1))}e.addEventListener("drawpostprocess",function(m){d.drawShrinkBufferLoop(i,m);d.updateExpose(i);d.drawRenderTargetByIndex(i,0)})});var f=this.luminanceAdjustPreSettings;Object.keys(this.luminanceAdjustPreSettings).forEach(function(k){var j=f[k];if(k==CriLaLuminanceAdjustOptionName.MIDDLE_VALUE){d.setExposureBias(j)}else{if(k==CriLaLuminanceAdjustOptionName.ADJUST_MODE){d.setMode(j)}else{if(k==CriLaLuminanceAdjustOptionName.EXPOSE_VARIATION){d.setAdjustSpeed(j)}else{if(k==CriLaLuminanceAdjustOptionName.EXPOSE){d.setExposureValue(j)}}}}});this.luminanceAdjust=d};b.setLuminanceAdjustMode=function(c){this.luminanceAdjust?this.luminanceAdjust.setMode(c):this.luminanceAdjustPreSettings[CriLaLuminanceAdjustOptionName.ADJUST_MODE]=c};b.getLuminanceAdjustMode=function(){return this.luminanceAdjust?this.luminanceAdjust.getMode():null};b.setLuminanceAdjustSpeed=function(c){this.luminanceAdjust?this.luminanceAdjust.setAdjustSpeed(c):this.luminanceAdjustPreSettings[CriLaLuminanceAdjustOptionName.EXPOSE_VARIATION]=c};b.getLuminanceAdjustSpeed=function(){return this.luminanceAdjust?this.luminanceAdjust.getAdjustSpeed():null};b.setLuminanceAdjustExposureValue=function(c){this.luminanceAdjust?this.luminanceAdjust.setExposureValue(c):this.luminanceAdjustPreSettings[CriLaLuminanceAdjustOptionName.EXPOSE]=c};b.getLuminanceAdjustExposureValue=function(){return this.luminanceAdjust?this.luminanceAdjust.getExposureValue():null};b.setLuminanceAdjustExposureBias=function(c){this.luminanceAdjust?this.luminanceAdjust.setExposureBias(c):this.luminanceAdjustPreSettings[CriLaLuminanceAdjustOptionName.MIDDLE_VALUE]=c};b.getLuminanceAdjustExposureBias=function(){return this.luminanceAdjust?this.luminanceAdjust.getExposureBias():null}})(CriLaPlayerWebGL.prototype,CriLaMgPlayerCommon.prototype);function CriLaMesh(a){this.gl_=a;this.vertexBuffer_=null;this.indexBuffer_=null;this.vertexLayout_=null;this.numIndices_=0;this.primitiveType_=a.TRIANGLES;this.materialIndex_=0;this.submeshList_=[]}(function(a){a.loadLmd_=function(c,p){var g=this.gl_;var j=c.vertices;var l=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,l);g.bufferData(g.ARRAY_BUFFER,new Float32Array(j),g.STATIC_DRAW);var o=c.indices;if(o==null){var k=j.length;var d=k/3/5;o=[];for(var f=0;f<d*3;f++){o.push(f)}}this.numIndices_=o.length;var n=g.createBuffer();g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,n);g.bufferData(g.ELEMENT_ARRAY_BUFFER,new Uint16Array(o),g.STATIC_DRAW);this.vertexBuffer_=l;this.indexBuffer_=n;var h=c.primitive_type;if(h=="triangle_strip"){this.primitiveType_=g.TRIANGLE_STRIP}for(var f=0;f<p.length;f++){if(c.material===p[f].name){this.materialIndex_=f;break}}var b=c.submeshes;for(var f=0;f<b.length;f++){var e=b[f];var m=new CriLaSubmesh();m.loadLmd_(e);this.submeshList_.push(m)}return true};a.getVertexBuffer=function(){return this.vertexBuffer_};a.getIndexBuffer=function(){return this.indexBuffer_};a.getMaterialIndex=function(){return this.materialIndex_}})(CriLaMesh.prototype);function CriLaSubmesh(){this.startIndex=0;this.numPrimitives=0;this.materialName=""}(function(a){a.loadLmd_=function(b){this.startIndex=b.start_index;this.numPrimitives=b.num_primitives;this.materialName=b.material_name;return true}})(CriLaSubmesh.prototype);function CriLaMaterial(a){this.gl_=a;this.name="";this.shader_=null;this.textureIndexList_=[];this.uvMatrix_=[1,0,0,0,0,1,0,0]}(function(a){a.resolveTextureIndex_=function(d,c){var b=[];d.forEach(function(f,e){if(Array.isArray(c.texture)){c.texture.forEach(function(g){if(g===f.name){b.push(e)}})}else{if(c.texture===f.name){b.push(e)}}});return b};a.loadLmd_=function(b,c){this.name=b.name;this.textureIndexList_=this.resolveTextureIndex_(c,b);this.create3D(b.shader);return true};a.getTextureIndex=function(){if(this.textureIndexList_.length<=0){return -1}return this.textureIndexList_[0]};a.create2D=function(b){var c=new CriLaShader(this.gl_,b);c.setSourceVS(CriLaWebGL.vsCode2d);c.setSourcePS(CriLaWebGL.psCode2d);c.linkProgram();this.shader_=c};a.create3D=function(b){var c=new CriLaShader(this.gl_,b);c.setSourceVS(CriLaWebGL.vsCode3d);c.setSourcePS(CriLaWebGL.psCode3d);c.linkProgram();this.shader_=c};a.getProgram=function(){return this.shader_.getProgram()};a.getTexture=function(){return this.texture_};a.setUvMatrix=function(b){this.uvMatrix_=b};a.setTextureFromImage=function(e,c){var b=this.getTextureIndex();if(b<0){return}var d=c[b];d.setImage(e);this.uvMatrix_=[-1,0,0,1,0,1,0,0]};a.setTextureFromVideo=function(e,c){var b=this.getTextureIndex();if(b<0){return}var d=c[b];d.setVideo(e);this.uvMatrix_=[-1,0,0,1,0,-1,0,1]};a.setShaderParameterMatrix=function(c,b){this.shader_.setParameterMatrix(c,b)};a.setShaderParameterVector4=function(c,d){var b=4;this.shader_.setParameterVArray(c,d,4)};a.setShaderSampler=function(c,b,d){this.shader_.setSampler(c,b,d)};a.applyShaderParameter=function(c){var b=4;this.shader_.setParameterVArray("u_uv_matrix[0]",this.uvMatrix_,b);if(c!=null){this.shader_.setSampler(0,"s_color",c)}};a.getCriLaShader=function(){return this.shader_}})(CriLaMaterial.prototype);function CriLaShader(b,a){this.gl_=b;this.shaderProgram_=null;this.vsShader_=null;this.psShader_=null;this.uniformList_={};this.name=a||"constant"}(function(a){a.getProgram=function(){return this.shaderProgram_};a.getUniformList=function(){return this.uniformList_};a.setParameterMatrix=function(c,b){var d=this.gl_;if(c in this.uniformList_){var e=[b.m00,b.m01,b.m02,b.m03,b.m10,b.m11,b.m12,b.m13,b.m20,b.m21,b.m22,b.m23,b.m30,b.m31,b.m32,b.m33];d.uniformMatrix4fv(this.uniformList_[c],false,e)}};a.setParameterV=function(c,b){this.setParameterFVArray_(c,b,b.length)};a.setParameterVArray=function(b,c,d){this.setParameterFVArray_(b,c,d)};a.setParameterF=function(b,c){var d=this.gl_;if(b in this.uniformList_){d.uniform1f(this.uniformList_[b],c)}};a.setParameterFArray=function(b,c){this.setParameterFVArray_(b,c,c.length)};a.setParameterFVArray_=function(d,f,c){var e=this.gl_;if(d in this.uniformList_&&Array.isArray(f)){var b=this.uniformList_[d];if(c==1){e.uniform1fv(b,f)}else{if(c==2){e.uniform2fv(b,f)}else{if(c==3){e.uniform3fv(b,f)}else{if(c>3){e.uniform4fv(b,f)}}}}}};a.setSampler=function(d,c,e){var f=this.gl_;if(e.isComplete()==false){return}var b=e.getGlTexture();if(c in this.uniformList_){f.activeTexture(f.TEXTURE0+d);f.bindTexture(f.TEXTURE_2D,b);f.uniform1i(this.uniformList_[c],d);if(e.isVideo()==true){e.updateVideo()}}};a.resolveUniformList_=function(c){var h=this.gl_;var g=h.getProgramParameter(c,h.ACTIVE_UNIFORMS);var f={};for(var e=0;e<g;e++){var j=h.getActiveUniform(c,e);var d=j.name;var b=h.getUniformLocation(c,d);f[d]=b}this.uniformList_=f};a.setSourceVS=function(b){var c=this.gl_;this.deleteWebGLShader_(this.vsShader_);this.vsShader_=this.createWebGLShaderFromString_(c.VERTEX_SHADER,b);if(this.vsShader_==null){return false}return true};a.setSourcePS=function(b){var c=this.gl_;this.deleteWebGLShader_(this.psShader_);this.psShader_=this.createWebGLShaderFromString_(c.FRAGMENT_SHADER,b);if(this.psShader_==null){return false}return true};a.linkProgram=function(){var d=this.gl_;var e=this.vsShader_;var b=this.psShader_;this.deleteWebGLProgram_();if(e==null||b==null){return false}var c=d.createProgram();d.attachShader(c,e);d.attachShader(c,b);d.bindAttribLocation(c,0,"in_position");d.bindAttribLocation(c,1,"in_uv");d.linkProgram(c);if(d.getProgramParameter(c,d.LINK_STATUS)==0){return false}this.resolveUniformList_(c);this.shaderProgram_=c;return true};a.createWebGLShaderFromString_=function(e,c){var d=this.gl_;var b=d.createShader(e);if(b==null){return null}d.shaderSource(b,c);d.compileShader(b);if(d.getShaderParameter(b,d.COMPILE_STATUS)==0){this.deleteWebGLShader_(b);return null}return b};a.deleteWebGLShader_=function(b){var c=this.gl_;if(b!=null){c.deleteShader(b)}};a.deleteWebGLProgram_=function(){var b=this.gl_;if(this.shaderProgram_!=null){b.deleteProgram(this.shaderProgram_);this.shaderProgram_=null}}})(CriLaShader.prototype);function CriLaTexture(a){this.gl_=a;this.texture_=null;this.isComplete_=false;this.srcVideo_=null}(function(a){a.load=function(b){var f=this.gl_;var c=this;var d=new Image();this.image_=d;d.crossOrigin="anonymous";d.onload=function(){c.setImage(d);d=null};if(b){var e=new XMLHttpRequest();e.onreadystatechange=function(){if(this.readyState==4&&this.status==200){var g=window.URL.createObjectURL(this.response);d.src=c.url_=g}};e.open("GET",b);e.responseType="blob";e.send()}else{d.src=this.url_}};a.unload=function(){if(!this.image_){return}var b=this.gl_;b.bindTexture(b.TEXTURE_2D,this.texture_);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,1,1,0,b.RGBA,b.UNSIGNED_BYTE,null);b.bindTexture(b.TEXTURE_2D,null);this.image_.src="";this.image_=null;criLiveActRelease()};a.setImage=function(c){var d=this.gl_;var b=this.texture_;if(b==null){this.texture_=b=d.createTexture()}d.bindTexture(d.TEXTURE_2D,b);d.texImage2D(d.TEXTURE_2D,0,d.RGBA,d.RGBA,d.UNSIGNED_BYTE,c);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,d.LINEAR);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,d.LINEAR);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE);d.bindTexture(d.TEXTURE_2D,null);this.isComplete_=true};a.setVideo=function(c){var d=this.gl_;var b=this.texture_;if(b==null){this.texture_=b=d.createTexture()}d.bindTexture(d.TEXTURE_2D,b);d.pixelStorei(d.UNPACK_FLIP_Y_WEBGL,true);d.texImage2D(d.TEXTURE_2D,0,d.RGBA,d.RGBA,d.UNSIGNED_BYTE,c);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MAG_FILTER,d.LINEAR);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_MIN_FILTER,d.LINEAR);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_S,d.CLAMP_TO_EDGE);d.texParameteri(d.TEXTURE_2D,d.TEXTURE_WRAP_T,d.CLAMP_TO_EDGE);d.bindTexture(d.TEXTURE_2D,null);this.isComplete_=true;this.srcVideo_=c};a.updateVideo=function(){var b=this.srcVideo_;if(b==null){return}var c=this.gl_;c.bindTexture(c.TEXTURE_2D,this.texture_);c.texImage2D(c.TEXTURE_2D,0,c.RGBA,c.RGBA,c.UNSIGNED_BYTE,b)};a.isComplete=function(){return this.isComplete_};a.getGlTexture=function(){return this.texture_};a.isVideo=function(){return this.srcVideo_!=null}})(CriLaTexture.prototype);function CriLaCamera(a){this.gl_=a;this.viewWidth_=640;this.viewHeight_=480;this.aspectRatio_=this.viewWidth_/this.viewHeight_;this.fovy_=45*Math.PI/180;this.nearClip_=0.1;this.farClip_=1000;this.position_=new CriGrxVector3();this.upVector_=new CriGrxVector3();this.focus_=new CriGrxVector3();this.focus_.setXYZ(0,0,-1);this.viewMatrix_=null;this.projectionMatrix_=null}(function(a){a.initialize=function(b){this.viewMatrix_=new CriGrxMatrix();this.projectionMatrix_=new CriGrxMatrix();this.position_.z=10;this.upVector_.y=1;this.setViewport(b.width,b.height);this.update()};a.setViewAngle=function(b){this.fovy_=b;this.updateProjection_()};a.setAspectRatio=function(b){this.aspectRatio_=b;this.updateProjection_()};a.getAspectRatio=function(){return this.aspectRatio_};a.setViewport=function(c,b){this.viewWidth_=c;this.viewHeight_=b;this.aspectRatio_=this.viewWidth_/this.viewHeight_;this.update()};a.update=function(){var b=this.gl_;b.viewport(0,0,this.viewWidth_,this.viewHeight_);this.updateView_();this.updateProjection_()};a.updateView_=function(){var b=this.viewMatrix_;b.setIdentity();b.lookAtRH(this.position_,this.focus_,this.upVector_)};a.updateProjection_=function(){var b=this.projectionMatrix_;b.setPerspectiveRH(this.fovy_,this.aspectRatio_,this.nearClip_,this.farClip_)};a.setViewMatrix=function(b){this.viewMatrix_=b};a.getViewMatrix=function(){return this.viewMatrix_};a.getProjectionMatrix=function(){return this.projectionMatrix_};a.setCameraFromRotation=function(b,e,d){if(b==0&&e==0&&d==0){return}var c=this.viewMatrix_;c.setIdentity();c.rotateX(-Math.PI/2);if(window.orientation!=null){c.rotateY(-window.orientation*Math.PI/180)}c.rotateZ(d);c.rotateX(b);c.rotateY(e)}})(CriLaCamera.prototype);var CriLaLuminanceAdjustMode={AUTO:"auto",MANUAL:"manual"};var CriLaLuminanceAdjustOptionName={EXPOSE:"expose",EXPOSE_VARIATION:"exposevariation",MIDDLE_VALUE:"middlevalue",ADJUST_MODE:"adjustmode"};function CriLaAutoLuminanceAdjustShaderSet(b,a,c){this.shader=b;this.uniformLocation=c;this.attributeLocation=a}function CriAutoLuminanceAdjust(b,a){this.smooth_shrink_shader_set=null;this.simple_draw_shader_set=null;this.pos_buffer=null;this.uv_buffer=null;this.crop_uv_buffer=null;this.index_buffer=null;this.render_targets=null;this.expose=1;this.expose_variation=0.01;this.middle_grey=96;this.mode=CriLaLuminanceAdjustMode.AUTO;this.auto_mode_clamp_range={min:0.1,max:5};this.setupShader(b);this.setupBuffer(b,a);this.setupRenderTarget(b)}(function(a){var i=[1,1,0,-1,1,0,1,-1,0,-1,-1,0];var g=[0,1,2,3];var k=[1,1,0,1,1,0,0,0];var e="\n attribute vec3 pos;    \n attribute vec2 uv;    \n varying vec2 v_uv;    \n void main () {    \n   v_uv = uv;    \n   highp vec4 tmpvar_1;    \n   tmpvar_1.w = 1.0;    \n   tmpvar_1.xyz = pos;    \n   gl_Position = tmpvar_1;    \n }";var j="\n  precision mediump float;    \n uniform sampler2D color_texture;    \n varying vec2 v_uv;    \n void main () {    \n   lowp vec4 tmpvar_1;    \n   tmpvar_1.w = 1.0;    \n   tmpvar_1.xyz = texture2D (color_texture, v_uv).xyz;    \n   gl_FragColor = tmpvar_1;    \n }";var f="\n  precision mediump float;\n uniform sampler2D color_texture;\n uniform vec2 resolution;\n varying vec2 v_uv;\n void main () {\n   lowp vec4 color_1;\n   vec2 tmpvar_2;\n   tmpvar_2 = (1.0/(resolution));\n   color_1 = (0.25 * texture2D (color_texture, v_uv));\n   color_1 = (color_1 + (0.0625 * texture2D (color_texture, (v_uv - tmpvar_2))));\n   color_1 = (color_1 + (0.125 * texture2D (color_texture, (v_uv + (tmpvar_2 * vec2(-1.0, 0.0))))));\n   color_1 = (color_1 + (0.0625 * texture2D (color_texture, (v_uv + (tmpvar_2 * vec2(-1.0, 1.0))))));\n   color_1 = (color_1 + (0.125 * texture2D (color_texture, (v_uv + (tmpvar_2 * vec2(0.0, -1.0))))));\n   color_1 = (color_1 + (0.125 * texture2D (color_texture, (v_uv + (tmpvar_2 * vec2(0.0, 1.0))))));\n   color_1 = (color_1 + (0.0625 * texture2D (color_texture, (v_uv + (tmpvar_2 * vec2(1.0, -1.0))))));\n   color_1 = (color_1 + (0.125 * texture2D (color_texture, (v_uv + (tmpvar_2 * vec2(1.0, 0.0))))));\n   color_1 = (color_1 + (0.0625 * texture2D (color_texture, (v_uv + tmpvar_2))));\n   lowp vec4 tmpvar_3;\n   tmpvar_3.w = 1.0;\n   tmpvar_3.xyz = color_1.xyz;\n   gl_FragColor = tmpvar_3;\n }";var d=" precision mediump float; varying vec2 v_uv; uniform float blend_param; uniform sampler2D s_color; void main () {   lowp vec4 color_1;   lowp vec4 tmpvar_2;   tmpvar_2 = texture2D (s_color, v_uv);   color_1.w = tmpvar_2.w;   color_1.xyz = pow (tmpvar_2.xyz, vec3((1.0/(blend_param))));   gl_FragColor = color_1; } ";var d=" precision mediump float; varying vec2 v_uv; uniform float blend_param; uniform sampler2D s_color; void main () {   lowp vec4 color_1;   lowp vec4 tmpvar_2;   tmpvar_2 = texture2D (s_color, v_uv);   color_1.w = tmpvar_2.w;   color_1.xyz = pow (tmpvar_2.xyz, vec3((1.0/(blend_param))));   gl_FragColor = color_1; } ";var b=" precision mediump float; varying vec2 v_uv; uniform float blend_param; uniform sampler2D s_color; uniform sampler2D s_color_1; uniform sampler2D s_color_2; void main () {   float exposure_1;   lowp vec4 color_2;   lowp vec4 tmpvar_3;   tmpvar_3 = texture2D (s_color, v_uv);   lowp vec4 tmpvar_4;   tmpvar_4 = texture2D (s_color_1, v_uv);   lowp vec4 tmpvar_5;   tmpvar_5 = texture2D (s_color_2, v_uv);   color_2 = tmpvar_3;   exposure_1 = blend_param;   if ((blend_param < 1.0)) {     color_2 = ((tmpvar_3 * blend_param) + (tmpvar_4 * (1.0 - blend_param)));   } else {     if ((blend_param > 1.0)) {       exposure_1 = (blend_param - 1.0);       color_2 = ((tmpvar_5 * exposure_1) + (tmpvar_3 * (1.0 - exposure_1)));     };   };   gl_FragColor = color_2; } ";var h="   precision mediump float; varying vec2 v_uv; uniform float blend_param; uniform sampler2D s_color; uniform sampler2D s_color_1; uniform sampler2D s_color_2; uniform sampler2D s_color_3; uniform sampler2D s_color_4; void main () {   lowp vec4 color_1;   lowp vec4 tmpvar_2;   tmpvar_2 = texture2D (s_color, v_uv);   lowp vec4 tmpvar_3;   tmpvar_3 = texture2D (s_color_1, v_uv);   lowp vec4 tmpvar_4;   tmpvar_4 = texture2D (s_color_2, v_uv);   lowp vec4 tmpvar_5;   tmpvar_5 = texture2D (s_color_3, v_uv);   lowp vec4 tmpvar_6;   tmpvar_6 = texture2D (s_color_4, v_uv);   color_1 = tmpvar_2;   float tmpvar_7;   tmpvar_7 = abs(((2.0 * blend_param) - 2.0));   float tmpvar_8;   tmpvar_8 = (1.0 - abs((tmpvar_7 - 1.0)));   float tmpvar_9;   tmpvar_9 = (float((tmpvar_7 >= 1.0)) * abs((tmpvar_7 - 1.0)));   float tmpvar_10;   tmpvar_10 = (abs((     float((tmpvar_7 >= 1.0))    - 1.0)) * (1.0 - tmpvar_7));   if ((blend_param < 1.0)) {     color_1 = (((tmpvar_10 * tmpvar_2) + (tmpvar_8 * tmpvar_4)) + (tmpvar_9 * tmpvar_3));   } else {     if ((blend_param > 1.0)) {       color_1 = (((tmpvar_10 * tmpvar_2) + (tmpvar_8 * tmpvar_5)) + (tmpvar_9 * tmpvar_6));     };   };   gl_FragColor = color_1; }";function c(n,l,m){n.activeTexture(n.TEXTURE0);n.bindTexture(n.TEXTURE_2D,m);n.uniform1i(l,0)}a.updateExpose=function(p){if(this.mode==CriLaLuminanceAdjustMode.AUTO){var n=this.getBrightnessAverageByIndex(p,this.render_targets.length-1);var o=16;var m=this.middle_grey;var l=isNaN(this.expose)?1:this.expose;if(n>(m+o)){l-=this.expose_variation}else{if(n<(m-o)){l+=this.expose_variation}}this.expose=CriGrxMath.clamp(this.auto_mode_clamp_range.min,this.auto_mode_clamp_range.max,l)}};a.getAttributeLocations=function(n,m,o){var l={};o.forEach(function(q){var p=n.getAttribLocation(m,q);l[q]=p});return l};a.getUniformLocations=function(o,n,m){var l={};m.forEach(function(q){var p=o.getUniformLocation(n,q);l[q]=p});return l};a.createSimpleDrawShaderSet=function(n){var m=this.createLaShader(n,e,j);var l=this.getAttributeLocations(n,m.getProgram(),["pos","uv"]);var o=this.getUniformLocations(n,m.getProgram(),["color_texture"]);return new CriLaAutoLuminanceAdjustShaderSet(m,l,o)};a.createSmoothShrinkDrawShaderSet=function(n){var m=this.createLaShader(n,e,f);var o=this.getAttributeLocations(n,m.getProgram(),["pos","uv"]);var l=this.getUniformLocations(n,m.getProgram(),["color_texture","resolution"]);return new CriLaAutoLuminanceAdjustShaderSet(m,o,l)};a.getJpegExposeDrawShaderCode=function(){return d};a.createLaShader=function(n,p,l){var o=new CriLaShader(n);var m=o.setSourceVS(p);if(!m){return null}m=o.setSourcePS(l);if(!m){return null}m=o.linkProgram();if(!m){return null}return o};a.createArrayBuffer=function(n,m){var l=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,l);n.bufferData(n.ARRAY_BUFFER,new Float32Array(m),n.STATIC_DRAW);n.bindBuffer(n.ARRAY_BUFFER,null);return l};a.createElementArrayBuffer=function(n,m){var l=n.createBuffer();n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,l);n.bufferData(n.ELEMENT_ARRAY_BUFFER,new Uint16Array(m),n.STATIC_DRAW);n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,null);return l};a.setupBuffer=function(p,o){var m=p.drawingBufferWidth;var n=p.drawingBufferHeight;var o=o||CriLaRectangle.createFromXYWH(0,0,m,n);this.pos_buffer=this.createArrayBuffer(p,i);this.uv_buffer=this.createArrayBuffer(p,k);this.index_buffer=this.createElementArrayBuffer(p,g);var l=[o.right/m,o.bottom/n,o.left/m,o.bottom/n,o.right/m,o.top/n,o.left/m,o.top/n];this.crop_uv_buffer=this.createArrayBuffer(p,l)};a.setupRenderTarget=function(q){var n=q.drawingBufferWidth>q.drawingBufferHeight?q.drawingBufferWidth:q.drawingBufferHeight;var p=parseInt(Math.log(n)/Math.log(2))+1;var m=Math.pow(2,p);var l=[];l.push(new CriLaRenderTarget(q,m,m));for(var o=0;o<(p-2);o++){m=m/2;l.push(new CriLaRenderTarget(q,m,m))}this.render_targets=l};a.setupShader=function(l){this.simple_draw_shader_set=this.createSimpleDrawShaderSet(l);this.smooth_shrink_shader_set=this.createSmoothShrinkDrawShaderSet(l)};a.drawShrinkBufferLoop=function(n,m){this.drawToRenderTargetWithCrop(n,m.rendertarget,this.render_targets[1]);for(var l=1;(l+1)<this.render_targets.length;l++){this.drawToRenderTarget(n,this.render_targets[l],this.render_targets[l+1])}};a.drawToRenderTarget=function(n,m,o){var l=this.smooth_shrink_shader_set.uniformLocation;o.set(n);this.draw(n,this.smooth_shrink_shader_set.shader,this.smooth_shrink_shader_set.attributeLocation,function(){c(n,l.color_texture,m.colorTexture);n.uniform2f(l.resolution,m.width,m.height)},this.uv_buffer);o.unset(n)};a.drawToRenderTargetWithCrop=function(n,m,o){var l=this.smooth_shrink_shader_set.uniformLocation;o.set(n);this.draw(n,this.smooth_shrink_shader_set.shader,this.smooth_shrink_shader_set.attributeLocation,function(){c(n,l.color_texture,m.colorTexture);n.uniform2f(l.resolution,m.width,m.height)},this.crop_uv_buffer);o.unset(n)};a.draw=function(o,r,m,q,l){function n(w,u,t,s,v){w.bindBuffer(w.ARRAY_BUFFER,u);w.enableVertexAttribArray(t);w.vertexAttribPointer(t,s,v,false,0,0)}function p(t,s){t.disableVertexAttribArray(s)}o.cullFace(o.BACK);o.useProgram(r.getProgram());o.clearColor(0,0,0,1);o.clearDepth(1);o.clear(o.COLOR_BUFFER_BIT|o.DEPTH_BUFFER_BIT);if(q){q()}n(o,this.pos_buffer,m.pos,3,o.FLOAT);n(o,l,m.uv,2,o.FLOAT);o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,this.index_buffer);o.drawElements(o.TRIANGLE_STRIP,4,o.UNSIGNED_SHORT,0);o.bindTexture(o.TEXTURE_2D,null);o.bindBuffer(o.ARRAY_BUFFER,null);o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,null);p(o,m.pos);p(o,m.uv);o.useProgram(null);o.cullFace(o.FRONT)};a.getBrightnessAverageByIndex=function(r,m){var p=this.render_targets[m];var l=new Uint8Array(p.width*p.height*4);p.set(r);r.readPixels(0,0,p.width,p.height,r.RGBA,r.UNSIGNED_BYTE,l);p.unset(r);var q=[];for(var o=0;o<l.length;o++){if(o%4!=3){q.push(l[o])}}var n=[];for(var o=0;o<q.length;o+=3){n.push(0.299*q[o]+0.587*q[o+1]+0.114*q[o+2])}return n.reduce(function(t,s){return t+s})/n.length};a.drawRenderTargetByIndex=function(o,m){var l=this.simple_draw_shader_set.uniformLocation;var n=this.render_targets[m].colorTexture;this.draw(o,this.simple_draw_shader_set.shader,this.simple_draw_shader_set.attributeLocation,function(){c(o,l.color_texture,n)},this.uv_buffer)};a.convergeExpose=function(){var l=this.expose;if(0.99<l&&l<1.1){this.expose=1;return}this.expose+=l<1?this.expose_variation:-this.expose_variation;this.expose=Math.sign(l-1)!=Math.sign(this.expose-1)?1:this.expose};a.getJpegExposeDrawShaderName=function(){return d};a.getThreeTextureBlendShaderCode=function(){return b};a.getFiveTextureBlendShaderCode=function(){return h};a.getExposureValue=function(){return this.expose};a.setExposureValue=function(l){l=isNaN(l)?this.expose:l;this.expose=CriGrxMath.clamp(0,20,l)};a.getMode=function(){return this.mode};a.setMode=function(l){this.mode=l};a.setExposureBias=function(l){this.middle_grey=isNaN(l)?this.middle_grey:l};a.getExposureBias=function(){return this.middle_grey};a.setAdjustSpeed=function(l){l=isNaN(l)?this.expose_variation:l;this.expose_variation=CriGrxMath.clamp(0.001,0.3,l)};a.getAdjustSpeed=function(){return this.expose_variation};a.setupRawClampRange=function(m,l){this.auto_mode_clamp_range.min=0;this.auto_mode_clamp_range.max=2}})(CriAutoLuminanceAdjust.prototype);