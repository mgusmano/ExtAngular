/// <reference path="../../typings/extjs/ExtJS.d.ts" />

Ext.define('FitToParent',
{
    alias: 'plugin.fittoparent',

    extend: 'Object',

    /**
	 * @cfg {HTMLElement/Ext.Element/String} parent The element to fit the component size to (defaults to the element the component is rendered to).
	 */
    /**
	 * @cfg {Boolean} fitWidth If the plugin should fit the width of the component to the parent element (default <tt>true</tt>).
	 */
    fitWidth: true,

    /**
	 * @cfg {Boolean} fitHeight If the plugin should fit the height of the component to the parent element (default <tt>true</tt>).
	 */
    fitHeight: true,
    /**
	 * @cfg {Boolean} offsets Decreases the final size with [width, height] (default <tt>[0, 0]</tt>).
	 */
    offsets: [0, 0],
    /**
	 * @constructor
	 * @param {HTMLElement/Ext.Element/String/Object} config The parent element or configuration options.
	 * @ptype fittoparent
	 */
    constructor: function (config) {
        config = config || {};
        if (config.tagName || config.dom || Ext.isString(config)) {
            config = { parent: config };
        }
        Ext.apply(this, config);
    },
    init: function (c) {
        this.component = c;
        var me = this;
        c.on('render', function (c) {
            //this.parent = Ext.get(me.parent || c.getPositionEl().dom.parentNode);
            this.parent = Ext.get(me.parent || c.el.dom.parentNode);
            if (c.doLayout) {
                c.monitorResize = true;
                c.doLayout = Ext.Function.createInterceptor(c.doLayout, this.fitSize, this);
            }
            this.fitSize();
            //Ext.EventManager.onWindowResize(this.fitSize, this);
            Ext.on('resize', this.fitSize, this);
        }, this, { single: true });
    },
    fitSize: function () {
        var parent = this.parent.dom.parentElement;
				//debugger;
				//var parent = this.parent.dom;
        var styles = window.getComputedStyle(parent); 
				//console.log(styles);
        //debugger;
        var width = parseFloat(styles.width);
        var paddingLeft = parseFloat(styles.paddingLeft);
        var paddingRight = parseFloat(styles.paddingRight);
        var borderLeftWidth = parseFloat(styles.borderLeftWidth);
        var borderRightWidth = parseFloat(styles.borderRightWidth);
        //console.log('width: ' + width + ' paddingLeft: ' + paddingLeft + ' paddingRight: ' + paddingRight);
        var newWidth = width - paddingLeft - paddingRight - borderLeftWidth - borderRightWidth;
        //if (this.component.initialConfig.fit === "true") {
            var height = parseFloat(styles.height);
            var paddingTop = parseFloat(styles.paddingTop);
            var paddingBottom = parseFloat(styles.paddingBottom);
            var borderTopWidth = parseFloat(styles.borderTopWidth);
            var borderBottomWidth = parseFloat(styles.borderBottomWidth);
            var newHeight = height - paddingTop - paddingBottom - borderTopWidth - borderBottomWidth;
						//console.log('newWidth: ' + newWidth + ' newHeight: ' + newHeight);
            this.component.setSize(newWidth,newHeight);
        // }
        // else {
        //     this.component.setSize(newWidth);            
        // }
        
        //var pos = this.component.getPosition(true);
        //debugger;
        //var element = this.parent.dom;
       
        // var style = element.style; //|| window.getComputedStyle(element),
        // var width = element.offsetWidth; // or use style.width
        
        // var marginLeft = this.parent.getMargin('l');
        // //var marginLeft;if (style.marginLeft === "") {marginLeft = 0;} else {marginLeft = parseFloat(style.marginLeft)};
        // var marginRight = this.parent.getMargin('r');
        // //var marginRight;if (style.marginRight === "") {marginRight = 0;} else {marginRight = parseFloat(style.marginRight)};
        // var marginWidth = marginLeft + marginRight;
        
        // //var paddingLeft;if (style.paddingLeft === "") {paddingLeft = 0;} else {paddingLeft = parseFloat(style.paddingLeft)};
        // //var paddingRight;if (style.paddingRight === "") {paddingRight = 0;} else {paddingRight = parseFloat(style.paddingRight)};
        // var paddingWidth = paddingLeft + paddingRight;
        
        // var borderLeftWidth;if (style.borderLeftWidth === "") {borderLeftWidth = 0;} else {borderLeftWidth = parseFloat(style.borderLeftWidth)};
        // var borderRightWidth;if (style.borderRightWidth === "") {borderRightWidth = 0;} else {borderRightWidth = parseFloat(style.borderRightWidth)};
        // var borderWidth = borderLeftWidth + borderRightWidth;

        // var theWidth = width + marginWidth - paddingWidth + borderWidth;
        // //console.log('style.width: ' + style.width + ' width: ' + width + ' marginWidth: ' + marginWidth + ' paddingWidth: ' + paddingWidth + ' borderWidth: ' + borderWidth);
        // //console.log(this.parent)
        // //mjg= this.parent;
        
        // var height = element.offsetHeight;
         
        // var marginTop = this.parent.getMargin('t');
        // var marginBottom = this.parent.getMargin('b');
        // var marginHeight = marginTop + marginBottom;
        
        // var paddingTop = this.parent.getPadding('t');
        // var paddingBottom = this.parent.getPadding('b');
        // var paddingHeight = paddingTop + paddingBottom;

        // var borderTopHeight;if (style.borderTopHeight === "") {borderTopHeight = 0;} else {borderTopHeight = parseFloat(style.borderTopHeight)};
        // var borderBottomHeight;if (style.borderBottomHeight === "") {borderBottomHeight = 0;} else {borderBottomHeight = parseFloat(style.borderBottomHeight)};
        // var borderHeight = borderTopHeight + borderBottomHeight;
        
        // var theHeight = height + marginHeight - paddingHeight + borderHeight;
        
        // //var size = { width: theWidth, height: theHeight };
 
        // var size = { width: clientRect.width, height: clientRect.height };
        // console.log(size);
        // mjg= this.parent;
       
        
        
		//var size = this.parent.getViewSize();
        //size.width = theWidth;

        //var t = document.getElementById("s4-titlerow").clientHeight;
        //var w = document.getElementById("s4-workspace").clientHeight;



        // this.component.setSize(
        //     this.fitWidth ? size.width - pos[0] - this.offsets[0] : undefined,
        //     this.fitHeight ? size.height - pos[1] - this.offsets[1] : undefined);


        //this.component.setSize(
        //        this.fitWidth ? size.width - pos[0] - this.offsets[0] : undefined,
        //        w - 130);
        //	undefined);
        //this.fitHeight ? size.height - pos[1] - this.offsets[1] : undefined);
    }
});
