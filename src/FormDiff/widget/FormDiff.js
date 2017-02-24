define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",


], function (declare, _WidgetBase, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent) {
    "use strict";

    return declare("FormDiff.widget.FormDiff", [ _WidgetBase ], {


        // Internal variables.
        _handles: null,
        _contextObj: null,
		diffclass: "",
		selectclass: "",
		attrprefix: "attr_",
		tabindicator: null,

        constructor: function () {
            this._handles = [];
        },

        postCreate: function () {
            logger.debug(this.id + ".postCreate"); 
        },

       update: function (obj, callback) {
			this._contextObj = obj;
            this._updateRendering(callback);
        },
		

        resize: function (box) {
          logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
          logger.debug(this.id + ".uninitialize");
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }
			var node = "";
            this._executeCallback(callback);
			var self = this;
			setTimeout(function(){ 

				logger.debug(this.id + ".update");
				var i,j,k;
				// find all nodes with the diffclass
				var list = dojo.query("."+self.selectclass);
				// loop the found nodes.
				if (list) {
					for (i =0; i<list.length; i++) {
						var item = list[i]; 
						if (item) {
							var classes = item.classList;
							// look for all nodes after this node.
							for (j =i+1; j<list.length; j++) {
								var compareitem = list[j];
								var compareclasses = compareitem.classList;
								//console.log('classlist', compareclasses);
								for (k=0; k<classes.length;k++) {
									var cl = classes[k];
									// not the primary select class
									if (cl.startsWith(self.attrprefix)) {
										// if they have common classes 
										if (compareclasses.contains(cl)) {
											var control1 = self._findformcontrol(compareitem);
											var control2 = self._findformcontrol(item);
											var value1 = self._getNodeValue(control1);
											var value2 = self._getNodeValue(control2);
											if (control1 && control2 && (value1 !== value2)) {
												if (self.applymethod=="last" || self.applymethod=="both"){
													node = self._selectNode(compareitem, control2);
												}
												if (self.applymethod=="first" || self.applymethod=="both"){
													node = self._selectNode(item, control1);
												}
												//console.log('node', node);
												dojoClass.add(node, self.diffclass); 
												self._markTab(node);
												
											}
										}
									}
								}
							}
						} 
					} 
				}
			}, 500);
			
        },
		_selectNode: function (item, control) {
			console.log('applynode', this.applynode);
			if (this.applynode=="parent") {
				return item.parentNode;
			}
			if (this.applynode=="formcontrol") {
				//console.log("control", control);
				if (control instanceof Array) {
					return control[0];
				} else {
					return control;
				}
			}
			if (this.applynode=="node") {
				return item;
			}
			return item;
		},
		_getNodeValue: function(control) {
			if (control instanceof Array) {
				//console.log("console0", control[0].tagName);
				if (control[0].tagName=="LABEL") {
					return control[0].innerHTML;
				}
				return control[0].value;
			} 
			//console.log("getvalue", control);
			return control;
		},
		// finds either form-control (editable fields) or label below current id
		_findformcontrol: function (compare) {
			var control = dojo.query("div#"+compare.id + " .form-control");
			if (control && control.length > 0) {
				return control;
			} else {
				control = dojo.query("div#"+compare.id + " label");
				return control;
			}

		},
		_markTab: function (node) {
			console.log("marktab", this.marktab);
			if (this.marktab) {
				this._markTabTraversePath(node, null);
			}
		},
		_markTabTraversePath: function(node, tabpane) {
			var i;
			if (node) {
				//console.log("traverse", node);
				if (node.classList && node.classList.contains("mx-tabcontainer-pane")) {
					//console.log("tabpane", node);
					tabpane = node;
				}
				if (node.classList && node.classList.contains("mx-tabcontainer") && tabpane) {
					var tabs = dojo.query("#" + node.id + " .mx-tabcontainer-pane");
					var tabpage= tabs.indexOf(tabpane);
					console.log('this.tabpage = ', tabpage, node.id);
					var page = dojo.query("#" + node.id + " ul li");
					console.log('page', page, tabpage, page[tabpage]);
					if (page && page[tabpage]) {
						var siblings = page[tabpage].children; 
						console.log('sib', siblings);
						for (i=0; i<siblings.length;i++) {
							var spannode = siblings[i];
							if (spannode.classList && spannode.classList.contains("mx-tabcontainer-indicator")) {
								dojoStyle.set(spannode, "display", "block");
								spannode.innerHTML = "*";
							}
						}
					}
					return null;
				}
				this._markTabTraversePath(node.parentNode, tabpane);
			}
		},
        _executeCallback: function (cb) {
          if (cb && typeof cb === "function") {
            cb();
          }
        }
    });
});

require(["FormDiff/widget/FormDiff"]); 
