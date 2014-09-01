/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












(function($) {

  var cocoon_element_counter = 0;

  var create_new_id = function() {
    return (new Date().getTime() + cocoon_element_counter++);
  }

  var newcontent_braced = function(id) {
    return '[' + id + ']$1';
  }

  var newcontent_underscord = function(id) {
    return '_' + id + '_$1';
  }

  $(document).on('click', '.add_fields', function(e) {
    e.preventDefault();
    var $this                 = $(this),
        assoc                 = $this.data('association'),
        assocs                = $this.data('associations'),
        content               = $this.data('association-insertion-template'),
        insertionMethod       = $this.data('association-insertion-method') || $this.data('association-insertion-position') || 'before',
        insertionNode         = $this.data('association-insertion-node'),
        insertionTraversal    = $this.data('association-insertion-traversal'),
        count                 = parseInt($this.data('count'), 10),
        regexp_braced         = new RegExp('\\[new_' + assoc + '\\](.*?\\s)', 'g'),
        regexp_underscord     = new RegExp('_new_' + assoc + '_(\\w*)', 'g'),
        new_id                = create_new_id(),
        new_content           = content.replace(regexp_braced, newcontent_braced(new_id)),
        new_contents          = [];


    if (new_content == content) {
      regexp_braced     = new RegExp('\\[new_' + assocs + '\\](.*?\\s)', 'g');
      regexp_underscord = new RegExp('_new_' + assocs + '_(\\w*)', 'g');
      new_content       = content.replace(regexp_braced, newcontent_braced(new_id));
    }

    new_content = new_content.replace(regexp_underscord, newcontent_underscord(new_id));
    new_contents = [new_content];

    count = (isNaN(count) ? 1 : Math.max(count, 1));
    count -= 1;

    while (count) {
      new_id      = create_new_id();
      new_content = content.replace(regexp_braced, newcontent_braced(new_id));
      new_content = new_content.replace(regexp_underscord, newcontent_underscord(new_id));
      new_contents.push(new_content);

      count -= 1;
    }

    if (insertionNode){
      if (insertionTraversal){
        insertionNode = $this[insertionTraversal](insertionNode);
      } else {
        insertionNode = insertionNode == "this" ? $this : $(insertionNode);
      }
    } else {
      insertionNode = $this.parent();
    }

    $.each(new_contents, function(i, node) {
      var contentNode = $(node);

      insertionNode.trigger('cocoon:before-insert', [contentNode]);

      // allow any of the jquery dom manipulation methods (after, before, append, prepend, etc)
      // to be called on the node.  allows the insertion node to be the parent of the inserted
      // code and doesn't force it to be a sibling like after/before does. default: 'before'
      var addedContent = insertionNode[insertionMethod](contentNode);

      insertionNode.trigger('cocoon:after-insert', [contentNode]);
    });
  });

  $(document).on('click', '.remove_fields.dynamic, .remove_fields.existing', function(e) {
    var $this = $(this),
        wrapper_class = $this.data('wrapper-class') || 'nested-fields',
        node_to_delete = $this.closest('.' + wrapper_class),
        trigger_node = node_to_delete.parent();

    e.preventDefault();

    trigger_node.trigger('cocoon:before-remove', [node_to_delete]);

    var timeout = trigger_node.data('remove-timeout') || 0;

    setTimeout(function() {
      if ($this.hasClass('dynamic')) {
          node_to_delete.remove();
      } else {
          $this.prev("input[type=hidden]").val("1");
          node_to_delete.hide();
      }
      trigger_node.trigger('cocoon:after-remove', [node_to_delete]);
    }, timeout);
  });

  $('.remove_fields.existing.destroyed').each(function(i, obj) {
    var $this = $(this),
        wrapper_class = $this.data('wrapper-class') || 'nested-fields';

    $this.closest('.' + wrapper_class).hide();
  });

})(jQuery);
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
(function() {


}).call(this);
(function(){var a=this,b=a._,c={},d=Array.prototype,e=Object.prototype,f=Function.prototype,g=d.push,h=d.slice,i=d.concat,j=e.toString,k=e.hasOwnProperty,l=d.forEach,m=d.map,n=d.reduce,o=d.reduceRight,p=d.filter,q=d.every,r=d.some,s=d.indexOf,t=d.lastIndexOf,u=Array.isArray,v=Object.keys,w=f.bind,x=function(a){return a instanceof x?a:this instanceof x?void(this._wrapped=a):new x(a)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=x),exports._=x):a._=x,x.VERSION="1.4.4";var y=x.each=x.forEach=function(a,b,d){if(null!=a)if(l&&a.forEach===l)a.forEach(b,d);else if(a.length===+a.length){for(var e=0,f=a.length;f>e;e++)if(b.call(d,a[e],e,a)===c)return}else for(var g in a)if(x.has(a,g)&&b.call(d,a[g],g,a)===c)return};x.map=x.collect=function(a,b,c){var d=[];return null==a?d:m&&a.map===m?a.map(b,c):(y(a,function(a,e,f){d[d.length]=b.call(c,a,e,f)}),d)};var z="Reduce of empty array with no initial value";x.reduce=x.foldl=x.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),n&&a.reduce===n)return d&&(b=x.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(y(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError(z);return c},x.reduceRight=x.foldr=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),o&&a.reduceRight===o)return d&&(b=x.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);var f=a.length;if(f!==+f){var g=x.keys(a);f=g.length}if(y(a,function(h,i,j){i=g?g[--f]:--f,e?c=b.call(d,c,a[i],i,j):(c=a[i],e=!0)}),!e)throw new TypeError(z);return c},x.find=x.detect=function(a,b,c){var d;return A(a,function(a,e,f){return b.call(c,a,e,f)?(d=a,!0):void 0}),d},x.filter=x.select=function(a,b,c){var d=[];return null==a?d:p&&a.filter===p?a.filter(b,c):(y(a,function(a,e,f){b.call(c,a,e,f)&&(d[d.length]=a)}),d)},x.reject=function(a,b,c){return x.filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},x.every=x.all=function(a,b,d){b||(b=x.identity);var e=!0;return null==a?e:q&&a.every===q?a.every(b,d):(y(a,function(a,f,g){return(e=e&&b.call(d,a,f,g))?void 0:c}),!!e)};var A=x.some=x.any=function(a,b,d){b||(b=x.identity);var e=!1;return null==a?e:r&&a.some===r?a.some(b,d):(y(a,function(a,f,g){return e||(e=b.call(d,a,f,g))?c:void 0}),!!e)};x.contains=x.include=function(a,b){return null==a?!1:s&&a.indexOf===s?-1!=a.indexOf(b):A(a,function(a){return a===b})},x.invoke=function(a,b){var c=h.call(arguments,2),d=x.isFunction(b);return x.map(a,function(a){return(d?b:a[b]).apply(a,c)})},x.pluck=function(a,b){return x.map(a,function(a){return a[b]})},x.where=function(a,b,c){return x.isEmpty(b)?c?null:[]:x[c?"find":"filter"](a,function(a){for(var c in b)if(b[c]!==a[c])return!1;return!0})},x.findWhere=function(a,b){return x.where(a,b,!0)},x.max=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&65535>a.length)return Math.max.apply(Math,a);if(!b&&x.isEmpty(a))return-1/0;var d={computed:-1/0,value:-1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g>=d.computed&&(d={value:a,computed:g})}),d.value},x.min=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&65535>a.length)return Math.min.apply(Math,a);if(!b&&x.isEmpty(a))return 1/0;var d={computed:1/0,value:1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;d.computed>g&&(d={value:a,computed:g})}),d.value},x.shuffle=function(a){var b,c=0,d=[];return y(a,function(a){b=x.random(c++),d[c-1]=d[b],d[b]=a}),d};var B=function(a){return x.isFunction(a)?a:function(b){return b[a]}};x.sortBy=function(a,b,c){var d=B(b);return x.pluck(x.map(a,function(a,b,e){return{value:a,index:b,criteria:d.call(c,a,b,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(d>c||void 0===d)return-1}return a.index<b.index?-1:1}),"value")};var C=function(a,b,c,d){var e={},f=B(b||x.identity);return y(a,function(b,g){var h=f.call(c,b,g,a);d(e,h,b)}),e};x.groupBy=function(a,b,c){return C(a,b,c,function(a,b,c){(x.has(a,b)?a[b]:a[b]=[]).push(c)})},x.countBy=function(a,b,c){return C(a,b,c,function(a,b){x.has(a,b)||(a[b]=0),a[b]++})},x.sortedIndex=function(a,b,c,d){c=null==c?x.identity:B(c);for(var e=c.call(d,b),f=0,g=a.length;g>f;){var h=f+g>>>1;e>c.call(d,a[h])?f=h+1:g=h}return f},x.toArray=function(a){return a?x.isArray(a)?h.call(a):a.length===+a.length?x.map(a,x.identity):x.values(a):[]},x.size=function(a){return null==a?0:a.length===+a.length?a.length:x.keys(a).length},x.first=x.head=x.take=function(a,b,c){return null==a?void 0:null==b||c?a[0]:h.call(a,0,b)},x.initial=function(a,b,c){return h.call(a,0,a.length-(null==b||c?1:b))},x.last=function(a,b,c){return null==a?void 0:null==b||c?a[a.length-1]:h.call(a,Math.max(a.length-b,0))},x.rest=x.tail=x.drop=function(a,b,c){return h.call(a,null==b||c?1:b)},x.compact=function(a){return x.filter(a,x.identity)};var D=function(a,b,c){return y(a,function(a){x.isArray(a)?b?g.apply(c,a):D(a,b,c):c.push(a)}),c};x.flatten=function(a,b){return D(a,b,[])},x.without=function(a){return x.difference(a,h.call(arguments,1))},x.uniq=x.unique=function(a,b,c,d){x.isFunction(b)&&(d=c,c=b,b=!1);var e=c?x.map(a,c,d):a,f=[],g=[];return y(e,function(c,d){(b?d&&g[g.length-1]===c:x.contains(g,c))||(g.push(c),f.push(a[d]))}),f},x.union=function(){return x.uniq(i.apply(d,arguments))},x.intersection=function(a){var b=h.call(arguments,1);return x.filter(x.uniq(a),function(a){return x.every(b,function(b){return x.indexOf(b,a)>=0})})},x.difference=function(a){var b=i.apply(d,h.call(arguments,1));return x.filter(a,function(a){return!x.contains(b,a)})},x.zip=function(){for(var a=h.call(arguments),b=x.max(x.pluck(a,"length")),c=Array(b),d=0;b>d;d++)c[d]=x.pluck(a,""+d);return c},x.object=function(a,b){if(null==a)return{};for(var c={},d=0,e=a.length;e>d;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},x.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=x.sortedIndex(a,b),a[d]===b?d:-1;d=0>c?Math.max(0,e+c):c}if(s&&a.indexOf===s)return a.indexOf(b,c);for(;e>d;d++)if(a[d]===b)return d;return-1},x.lastIndexOf=function(a,b,c){if(null==a)return-1;var d=null!=c;if(t&&a.lastIndexOf===t)return d?a.lastIndexOf(b,c):a.lastIndexOf(b);for(var e=d?c:a.length;e--;)if(a[e]===b)return e;return-1},x.range=function(a,b,c){1>=arguments.length&&(b=a||0,a=0),c=arguments[2]||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=Array(d);d>e;)f[e++]=a,a+=c;return f},x.bind=function(a,b){if(a.bind===w&&w)return w.apply(a,h.call(arguments,1));var c=h.call(arguments,2);return function(){return a.apply(b,c.concat(h.call(arguments)))}},x.partial=function(a){var b=h.call(arguments,1);return function(){return a.apply(this,b.concat(h.call(arguments)))}},x.bindAll=function(a){var b=h.call(arguments,1);return 0===b.length&&(b=x.functions(a)),y(b,function(b){a[b]=x.bind(a[b],a)}),a},x.memoize=function(a,b){var c={};return b||(b=x.identity),function(){var d=b.apply(this,arguments);return x.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},x.delay=function(a,b){var c=h.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},x.defer=function(a){return x.delay.apply(x,[a,1].concat(h.call(arguments,1)))},x.throttle=function(a,b){var c,d,e,f,g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)};return function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},x.debounce=function(a,b,c){var d,e;return function(){var f=this,g=arguments,h=function(){d=null,c||(e=a.apply(f,g))},i=c&&!d;return clearTimeout(d),d=setTimeout(h,b),i&&(e=a.apply(f,g)),e}},x.once=function(a){var b,c=!1;return function(){return c?b:(c=!0,b=a.apply(this,arguments),a=null,b)}},x.wrap=function(a,b){return function(){var c=[a];return g.apply(c,arguments),b.apply(this,c)}},x.compose=function(){var a=arguments;return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},x.after=function(a,b){return 0>=a?b():function(){return 1>--a?b.apply(this,arguments):void 0}},x.keys=v||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[];for(var c in a)x.has(a,c)&&(b[b.length]=c);return b},x.values=function(a){var b=[];for(var c in a)x.has(a,c)&&b.push(a[c]);return b},x.pairs=function(a){var b=[];for(var c in a)x.has(a,c)&&b.push([c,a[c]]);return b},x.invert=function(a){var b={};for(var c in a)x.has(a,c)&&(b[a[c]]=c);return b},x.functions=x.methods=function(a){var b=[];for(var c in a)x.isFunction(a[c])&&b.push(c);return b.sort()},x.extend=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}),a},x.pick=function(a){var b={},c=i.apply(d,h.call(arguments,1));return y(c,function(c){c in a&&(b[c]=a[c])}),b},x.omit=function(a){var b={},c=i.apply(d,h.call(arguments,1));for(var e in a)x.contains(c,e)||(b[e]=a[e]);return b},x.defaults=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a},x.clone=function(a){return x.isObject(a)?x.isArray(a)?a.slice():x.extend({},a):a},x.tap=function(a,b){return b(a),a};var E=function(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a instanceof x&&(a=a._wrapped),b instanceof x&&(b=b._wrapped);var e=j.call(a);if(e!=j.call(b))return!1;switch(e){case"[object String]":return a==b+"";case"[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var f=c.length;f--;)if(c[f]==a)return d[f]==b;c.push(a),d.push(b);var g=0,h=!0;if("[object Array]"==e){if(g=a.length,h=g==b.length)for(;g--&&(h=E(a[g],b[g],c,d)););}else{var i=a.constructor,k=b.constructor;if(i!==k&&!(x.isFunction(i)&&i instanceof i&&x.isFunction(k)&&k instanceof k))return!1;for(var l in a)if(x.has(a,l)&&(g++,!(h=x.has(b,l)&&E(a[l],b[l],c,d))))break;if(h){for(l in b)if(x.has(b,l)&&!g--)break;h=!g}}return c.pop(),d.pop(),h};x.isEqual=function(a,b){return E(a,b,[],[])},x.isEmpty=function(a){if(null==a)return!0;if(x.isArray(a)||x.isString(a))return 0===a.length;for(var b in a)if(x.has(a,b))return!1;return!0},x.isElement=function(a){return!(!a||1!==a.nodeType)},x.isArray=u||function(a){return"[object Array]"==j.call(a)},x.isObject=function(a){return a===Object(a)},y(["Arguments","Function","String","Number","Date","RegExp"],function(a){x["is"+a]=function(b){return j.call(b)=="[object "+a+"]"}}),x.isArguments(arguments)||(x.isArguments=function(a){return!(!a||!x.has(a,"callee"))}),"function"!=typeof/./&&(x.isFunction=function(a){return"function"==typeof a}),x.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},x.isNaN=function(a){return x.isNumber(a)&&a!=+a},x.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==j.call(a)},x.isNull=function(a){return null===a},x.isUndefined=function(a){return void 0===a},x.has=function(a,b){return k.call(a,b)},x.noConflict=function(){return a._=b,this},x.identity=function(a){return a},x.times=function(a,b,c){for(var d=Array(a),e=0;a>e;e++)d[e]=b.call(c,e);return d},x.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))};var F={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};F.unescape=x.invert(F.escape);var G={escape:RegExp("["+x.keys(F.escape).join("")+"]","g"),unescape:RegExp("("+x.keys(F.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(a){x[a]=function(b){return null==b?"":(""+b).replace(G[a],function(b){return F[a][b]})}}),x.result=function(a,b){if(null==a)return null;var c=a[b];return x.isFunction(c)?c.call(a):c},x.mixin=function(a){y(x.functions(a),function(b){var c=x[b]=a[b];x.prototype[b]=function(){var a=[this._wrapped];return g.apply(a,arguments),L.call(this,c.apply(x,a))}})};var H=0;x.uniqueId=function(a){var b=++H+"";return a?a+b:b},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var I=/(.)^/,J={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},K=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(a,b,c){var d;c=x.defaults({},c,x.templateSettings);var e=RegExp([(c.escape||I).source,(c.interpolate||I).source,(c.evaluate||I).source].join("|")+"|$","g"),f=0,g="__p+='";a.replace(e,function(b,c,d,e,h){return g+=a.slice(f,h).replace(K,function(a){return"\\"+J[a]}),c&&(g+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'"),d&&(g+="'+\n((__t=("+d+"))==null?'':__t)+\n'"),e&&(g+="';\n"+e+"\n__p+='"),f=h+b.length,b}),g+="';\n",c.variable||(g="with(obj||{}){\n"+g+"}\n"),g="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+g+"return __p;\n";try{d=Function(c.variable||"obj","_",g)}catch(h){throw h.source=g,h}if(b)return d(b,x);var i=function(a){return d.call(this,a,x)};return i.source="function("+(c.variable||"obj")+"){\n"+g+"}",i},x.chain=function(a){return x(a).chain()};var L=function(a){return this._chain?x(a).chain():a};x.mixin(x),y(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=d[a];x.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!=a&&"splice"!=a||0!==c.length||delete c[0],L.call(this,c)}}),y(["concat","join","slice"],function(a){var b=d[a];x.prototype[a]=function(){return L.call(this,b.apply(this._wrapped,arguments))}}),x.extend(x.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this),function(a){var b,c,d,e;!function(){var a={},f={};b=function(b,c,d){a[b]={deps:c,callback:d}},e=d=c=function(b){function d(a){if("."!==a.charAt(0))return a;for(var c=a.split("/"),d=b.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(e._eak_seen=a,f[b])return f[b];if(f[b]={},!a[b])throw new Error("Could not find module "+b);for(var g,h=a[b],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)k.push("exports"===i[l]?g={}:c(d(i[l])));var n=j.apply(this,k);return f[b]=g||n}}(),b("rsvp/all",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a,b){return c.all(a,b)}}),b("rsvp/all_settled",["./promise","./utils","exports"],function(a,b,c){"use strict";function d(a){return{state:"fulfilled",value:a}}function e(a){return{state:"rejected",reason:a}}var f=a["default"],g=b.isArray,h=b.isNonThenable;c["default"]=function(a,b){return new f(function(b){function c(a){return function(b){j(a,d(b))}}function i(a){return function(b){j(a,e(b))}}function j(a,c){m[a]=c,0===--l&&b(m)}if(!g(a))throw new TypeError("You must pass an array to allSettled.");var k,l=a.length;if(0===l)return void b([]);for(var m=new Array(l),n=0;n<a.length;n++)k=a[n],h(k)?j(n,d(k)):f.cast(k).then(c(n),i(n))},b)}}),b("rsvp/asap",["exports"],function(a){"use strict";function b(){return function(){process.nextTick(e)}}function c(){var a=0,b=new h(e),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function d(){return function(){setTimeout(e,1)}}function e(){for(var a=0;a<i.length;a++){var b=i[a],c=b[0],d=b[1];c(d)}i=[]}a["default"]=function(a,b){var c=i.push([a,b]);1===c&&f()};var f,g="undefined"!=typeof window?window:{},h=g.MutationObserver||g.WebKitMutationObserver,i=[];f="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?b():h?c():d()}),b("rsvp/config",["./events","exports"],function(a,b){"use strict";function c(a,b){return"onerror"===a?void e.on("error",b):2!==arguments.length?e[a]:void(e[a]=b)}var d=a["default"],e={instrument:!1};d.mixin(e),b.config=e,b.configure=c}),b("rsvp/defer",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a){var b={};return b.promise=new c(function(a,c){b.resolve=a,b.reject=c},a),b}}),b("rsvp/events",["exports"],function(a){"use strict";var b=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},c=function(a){var b=a._promiseCallbacks;return b||(b=a._promiseCallbacks={}),b};a["default"]={mixin:function(a){return a.on=this.on,a.off=this.off,a.trigger=this.trigger,a._promiseCallbacks=void 0,a},on:function(a,d){var e,f=c(this);e=f[a],e||(e=f[a]=[]),-1===b(e,d)&&e.push(d)},off:function(a,d){var e,f,g=c(this);return d?(e=g[a],f=b(e,d),void(-1!==f&&e.splice(f,1))):void(g[a]=[])},trigger:function(a,b){var d,e,f=c(this);if(d=f[a])for(var g=0;g<d.length;g++)(e=d[g])(b)}}}),b("rsvp/filter",["./all","./map","./utils","exports"],function(a,b,c,d){"use strict";function e(a,b,c){if(!i(a))throw new TypeError("You must pass an array to filter.");if(!h(b))throw new TypeError("You must pass a function to filter's second argument.");return f(a,c).then(function(d){return g(a,b,c).then(function(a){var b,c=d.length,e=[];for(b=0;c>b;b++)a[b]&&e.push(d[b]);return e})})}var f=a["default"],g=b["default"],h=c.isFunction,i=c.isArray;d["default"]=e}),b("rsvp/hash",["./promise","./utils","exports"],function(a,b,c){"use strict";var d=a["default"],e=b.isNonThenable,f=b.keysOf;c["default"]=function(a){return new d(function(b,c){function g(a){return function(c){k[a]=c,0===--m&&b(k)}}function h(a){m=0,c(a)}var i,j,k={},l=f(a),m=l.length;if(0===m)return void b(k);for(var n=0;n<l.length;n++)j=l[n],i=a[j],e(i)?(k[j]=i,0===--m&&b(k)):d.cast(i).then(g(j),h)})}}),b("rsvp/instrument",["./config","./utils","exports"],function(a,b,c){"use strict";var d=a.config,e=b.now;c["default"]=function(a,b,c){try{d.trigger(a,{guid:b._guidKey+b._id,eventName:a,detail:b._detail,childGuid:c&&b._guidKey+c._id,label:b._label,timeStamp:e(),stack:new Error(b._label).stack})}catch(f){setTimeout(function(){throw f},0)}}}),b("rsvp/map",["./promise","./all","./utils","exports"],function(a,b,c,d){"use strict";var e=(a["default"],b["default"]),f=c.isArray,g=c.isFunction;d["default"]=function(a,b,c){if(!f(a))throw new TypeError("You must pass an array to map.");if(!g(b))throw new TypeError("You must pass a function to map's second argument.");return e(a,c).then(function(a){var d,f=a.length,g=[];for(d=0;f>d;d++)g.push(b(a[d]));return e(g,c)})}}),b("rsvp/node",["./promise","exports"],function(a,b){"use strict";function c(a,b){return function(c,d){c?b(c):a(arguments.length>2?e.call(arguments,1):d)}}var d=a["default"],e=Array.prototype.slice;b["default"]=function(a,b){return function(){var f=e.call(arguments),g=this||b;return new d(function(b,e){d.all(f).then(function(d){try{d.push(c(b,e)),a.apply(g,d)}catch(f){e(f)}})})}}}),b("rsvp/promise",["./config","./events","./instrument","./utils","./promise/cast","./promise/all","./promise/race","./promise/resolve","./promise/reject","exports"],function(a,b,c,d,e,f,g,h,i,j){"use strict";function k(){}function l(a,b){if(!z(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof l))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._id=H++,this._label=b,this._subscribers=[],w.instrument&&x("created",this),k!==a&&m(a,this)}function m(a,b){function c(a){r(b,a)}function d(a){t(b,a)}try{a(c,d)}catch(e){d(e)}}function n(a,b,c,d){var e=a._subscribers,f=e.length;e[f]=b,e[f+K]=c,e[f+L]=d}function o(a,b){var c,d,e=a._subscribers,f=a._detail;w.instrument&&x(b===K?"fulfilled":"rejected",a);for(var g=0;g<e.length;g+=3)c=e[g],d=e[g+b],p(b,c,d,f);a._subscribers=null}function p(a,b,c,d){var e,f,g,h,i=z(c);if(i)try{e=c(d),g=!0}catch(j){h=!0,f=j}else e=d,g=!0;q(b,e)||(i&&g?r(b,e):h?t(b,f):a===K?r(b,e):a===L&&t(b,e))}function q(a,b){var c,d=null;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(y(b)&&(d=b.then,z(d)))return d.call(b,function(d){return c?!0:(c=!0,void(b!==d?r(a,d):s(a,d)))},function(b){return c?!0:(c=!0,void t(a,b))},"derived from: "+(a._label||" unknown promise")),!0}catch(e){return c?!0:(t(a,e),!0)}return!1}function r(a,b){a===b?s(a,b):q(a,b)||s(a,b)}function s(a,b){a._state===I&&(a._state=J,a._detail=b,w.async(u,a))}function t(a,b){a._state===I&&(a._state=J,a._detail=b,w.async(v,a))}function u(a){o(a,a._state=K)}function v(a){a._onerror&&a._onerror(a._detail),o(a,a._state=L)}var w=a.config,x=(b["default"],c["default"]),y=d.objectOrFunction,z=d.isFunction,A=d.now,B=e["default"],C=f["default"],D=g["default"],E=h["default"],F=i["default"],G="rsvp_"+A()+"-",H=0;j["default"]=l,l.cast=B,l.all=C,l.race=D,l.resolve=E,l.reject=F;var I=void 0,J=0,K=1,L=2;l.prototype={constructor:l,_id:void 0,_guidKey:G,_label:void 0,_state:void 0,_detail:void 0,_subscribers:void 0,_onerror:function(a){w.trigger("error",a)},then:function(a,b,c){var d=this;this._onerror=null;var e=new this.constructor(k,c);if(this._state){var f=arguments;w.async(function(){p(d._state,e,f[d._state-1],d._detail)})}else n(this,e,a,b);return w.instrument&&x("chained",d,e),e},"catch":function(a,b){return this.then(null,a,b)},"finally":function(a,b){var c=this.constructor;return this.then(function(b){return c.cast(a()).then(function(){return b})},function(b){return c.cast(a()).then(function(){throw b})},b)}}}),b("rsvp/promise/all",["../utils","exports"],function(a,b){"use strict";var c=a.isArray,d=a.isNonThenable;b["default"]=function(a,b){var e=this;return new e(function(b,f){function g(a){return function(c){k[a]=c,0===--j&&b(k)}}function h(a){j=0,f(a)}if(!c(a))throw new TypeError("You must pass an array to all.");var i,j=a.length,k=new Array(j);if(0===j)return void b(k);for(var l=0;l<a.length;l++)i=a[l],d(i)?(k[l]=i,0===--j&&b(k)):e.cast(i).then(g(l),h)},b)}}),b("rsvp/promise/cast",["exports"],function(a){"use strict";a["default"]=function(a,b){var c=this;return a&&"object"==typeof a&&a.constructor===c?a:new c(function(b){b(a)},b)}}),b("rsvp/promise/race",["../utils","exports"],function(a,b){"use strict";var c=a.isArray,d=(a.isFunction,a.isNonThenable);b["default"]=function(a,b){var e,f=this;return new f(function(b,g){function h(a){j&&(j=!1,b(a))}function i(a){j&&(j=!1,g(a))}if(!c(a))throw new TypeError("You must pass an array to race.");for(var j=!0,k=0;k<a.length;k++){if(e=a[k],d(e))return j=!1,void b(e);f.cast(e).then(h,i)}},b)}}),b("rsvp/promise/reject",["exports"],function(a){"use strict";a["default"]=function(a,b){var c=this;return new c(function(b,c){c(a)},b)}}),b("rsvp/promise/resolve",["exports"],function(a){"use strict";a["default"]=function(a,b){var c=this;return new c(function(b){b(a)},b)}}),b("rsvp/race",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a,b){return c.race(a,b)}}),b("rsvp/reject",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a,b){return c.reject(a,b)}}),b("rsvp/resolve",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a,b){return c.resolve(a,b)}}),b("rsvp/rethrow",["exports"],function(a){"use strict";a["default"]=function(a){throw setTimeout(function(){throw a}),a}}),b("rsvp/utils",["exports"],function(a){"use strict";function b(a){return"function"==typeof a||"object"==typeof a&&null!==a}function c(a){return"function"==typeof a}function d(a){return!b(a)}function e(a){return"[object Array]"===Object.prototype.toString.call(a)}a.objectOrFunction=b,a.isFunction=c,a.isNonThenable=d,a.isArray=e;var f=Date.now||function(){return(new Date).getTime()};a.now=f;var g=Object.keys||function(a){var b=[];for(var c in a)b.push(c);return b};a.keysOf=g}),b("rsvp",["./rsvp/promise","./rsvp/events","./rsvp/node","./rsvp/all","./rsvp/all_settled","./rsvp/race","./rsvp/hash","./rsvp/rethrow","./rsvp/defer","./rsvp/config","./rsvp/map","./rsvp/resolve","./rsvp/reject","./rsvp/asap","./rsvp/filter","exports"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){"use strict";function q(a,b){C.async(a,b)}function r(){C.on.apply(C,arguments)}function s(){C.off.apply(C,arguments)}var t=a["default"],u=b["default"],v=c["default"],w=d["default"],x=e["default"],y=f["default"],z=g["default"],A=h["default"],B=i["default"],C=j.config,D=j.configure,E=k["default"],F=l["default"],G=m["default"],H=n["default"],I=o["default"];if(C.async=H,"undefined"!=typeof window&&"object"==typeof window.__PROMISE_INSTRUMENTATION__){var J=window.__PROMISE_INSTRUMENTATION__;D("instrument",!0);for(var K in J)J.hasOwnProperty(K)&&r(K,J[K])}p.Promise=t,p.EventTarget=u,p.all=w,p.allSettled=x,p.race=y,p.hash=z,p.rethrow=A,p.defer=B,p.denodeify=v,p.configure=D,p.on=r,p.off=s,p.resolve=F,p.reject=G,p.async=q,p.map=E,p.filter=I}),a.RSVP=c("rsvp")}(window);var EPUBJS=EPUBJS||{};EPUBJS.VERSION="0.2.1",EPUBJS.plugins=EPUBJS.plugins||{},EPUBJS.filePath=EPUBJS.filePath||"/epubjs/",EPUBJS.Render={},function(a){var b=a.ePub||{},c=a.ePub=function(){var a,b;return"undefined"!=typeof arguments[0]&&"string"==typeof arguments[0]&&(a=arguments[0],arguments[1]&&"object"==typeof arguments[1]?(b=arguments[1],b.bookPath=a):b={bookPath:a}),arguments[0]&&"object"==typeof arguments[0]&&(b=arguments[0]),new EPUBJS.Book(b)};_.extend(c,{noConflict:function(){return a.ePub=b,this}}),"function"==typeof define&&define.amd?define(function(){return c}):"undefined"!=typeof module&&module.exports&&(module.exports=c)}(window),EPUBJS.Book=function(a){this.settings=_.defaults(a||{},{bookPath:null,bookKey:null,packageUrl:null,storage:!1,fromStorage:!1,saved:!1,online:!0,contained:!1,width:null,height:null,layoutOveride:null,orientation:null,minSpreadWidth:800,gap:"auto",version:1,restore:!1,reload:!1,"goto":!1,styles:{},headTags:{},withCredentials:!1,render_method:"Iframe"}),this.settings.EPUBJSVERSION=EPUBJS.VERSION,this.spinePos=0,this.stored=!1,this.online=this.settings.online||navigator.onLine,this.networkListeners(),this.store=!1,this.settings.storage!==!1&&(this.storage=new fileStorage.storage(this.settings.storage)),this.ready={manifest:new RSVP.defer,spine:new RSVP.defer,metadata:new RSVP.defer,cover:new RSVP.defer,toc:new RSVP.defer,pageList:new RSVP.defer},this.readyPromises=[this.ready.manifest.promise,this.ready.spine.promise,this.ready.metadata.promise,this.ready.cover.promise,this.ready.toc.promise],this.pageList=[],this.pagination=new EPUBJS.Pagination,this.pageListReady=this.ready.pageList.promise,this.ready.all=RSVP.all(this.readyPromises),this.ready.all.then(this._ready.bind(this)),this.isRendered=!1,this._q=EPUBJS.core.queue(this),this._rendering=!1,this._displayQ=EPUBJS.core.queue(this),this._moving=!1,this._gotoQ=EPUBJS.core.queue(this),this.renderer=new EPUBJS.Renderer(this.settings.render_method),this.renderer.setMinSpreadWidth(this.settings.minSpreadWidth),this.renderer.setGap(this.settings.gap),this.listenToRenderer(this.renderer),this.defer_opened=new RSVP.defer,this.opened=this.defer_opened.promise,"string"==typeof this.settings.bookPath&&this.open(this.settings.bookPath,this.settings.reload),window.addEventListener("beforeunload",this.unload.bind(this),!1)},EPUBJS.Book.prototype.open=function(a,b){var c,d=this,e=new RSVP.defer;return this.settings.bookPath=a,this.bookUrl=this.urlFrom(a),this.settings.contained||this.isContained(a)?(this.settings.contained=this.contained=!0,this.bookUrl="",c=this.unarchive(a).then(function(){return d.loadPackage()})):c=this.loadPackage(),c.then(this.settings.restore&&!b&&localStorage?function(a){var b=d.packageIdentifier(a),c=d.restore(b);c||d.unpack(a),e.resolve(),d.defer_opened.resolve()}:function(a){d.unpack(a),e.resolve(),d.defer_opened.resolve()}),this.online&&this.settings.storage&&!this.settings.contained&&(this.settings.stored||e.then(d.storeOffline())),this._registerReplacements(this.renderer),e.promise},EPUBJS.Book.prototype.loadPackage=function(a){var b,c=this,d=new EPUBJS.Parser,e=a||"META-INF/container.xml";return b=this.settings.packageUrl?c.loadXml(c.settings.packageUrl):c.loadXml(c.bookUrl+e).then(function(a){return d.container(a)}).then(function(a){return c.settings.contentsPath=c.bookUrl+a.basePath,c.settings.packageUrl=c.bookUrl+a.packagePath,c.settings.encoding=a.encoding,c.loadXml(c.settings.packageUrl)}),b.catch(function(){console.error("Could not load book at: "+e),c.trigger("book:loadFailed",e)}),b},EPUBJS.Book.prototype.packageIdentifier=function(a){var b=new EPUBJS.Parser;return b.identifier(a)},EPUBJS.Book.prototype.unpack=function(a){var b=this,c=new EPUBJS.Parser;b.contents=c.packageContents(a,b.settings.contentsPath),b.manifest=b.contents.manifest,b.spine=b.contents.spine,b.spineIndexByURL=b.contents.spineIndexByURL,b.metadata=b.contents.metadata,b.settings.bookKey||(b.settings.bookKey=b.generateBookKey(b.metadata.identifier)),b.globalLayoutProperties=b.parseLayoutProperties(b.metadata),b.cover=b.contents.cover=b.settings.contentsPath+b.contents.coverPath,b.spineNodeIndex=b.contents.spineNodeIndex,b.ready.manifest.resolve(b.contents.manifest),b.ready.spine.resolve(b.contents.spine),b.ready.metadata.resolve(b.contents.metadata),b.ready.cover.resolve(b.contents.cover),b.contents.navPath?(b.settings.navUrl=b.settings.contentsPath+b.contents.navPath,b.loadXml(b.settings.navUrl).then(function(a){return c.nav(a,b.spineIndexByURL,b.spine)}).then(function(a){b.toc=b.contents.toc=a,b.ready.toc.resolve(b.contents.toc)},function(){b.ready.toc.resolve(!1)}),b.loadXml(b.settings.navUrl).then(function(a){return c.pageList(a,b.spineIndexByURL,b.spine)}).then(function(a){var c=new EPUBJS.EpubCFI,d=0;0!==a.length&&(b.pageList=b.contents.pageList=a,b.pageList.forEach(function(a){a.cfi||(d+=1,c.generateCfiFromHref(a.href,b).then(function(c){a.cfi=c,a.packageUrl=b.settings.packageUrl,d-=1,0===d&&(b.pagination.process(b.pageList),b.ready.pageList.resolve(b.pageList))}))}),d||(b.pagination.process(b.pageList),b.ready.pageList.resolve(b.pageList)))},function(){b.ready.pageList.resolve([])})):b.contents.tocPath?(b.settings.tocUrl=b.settings.contentsPath+b.contents.tocPath,b.loadXml(b.settings.tocUrl).then(function(a){return c.toc(a,b.spineIndexByURL,b.spine)}).then(function(a){b.toc=b.contents.toc=a,b.ready.toc.resolve(b.contents.toc)},function(){b.ready.toc.resolve(!1)})):b.ready.toc.resolve(!1)},EPUBJS.Book.prototype.createHiddenRender=function(a,b,c){var d,e,f=this.element.getBoundingClientRect(),g=b||this.settings.width||f.width,h=c||this.settings.height||f.height;return a.setMinSpreadWidth(this.settings.minSpreadWidth),a.setGap(this.settings.gap),this._registerReplacements(a),this.settings.forceSingle&&a.forceSingle(!0),d=document.createElement("div"),d.style.visibility="hidden",d.style.overflow="hidden",d.style.width="0",d.style.height="0",this.element.appendChild(d),e=document.createElement("div"),e.style.visibility="hidden",e.style.overflow="hidden",e.style.width=g+"px",e.style.height=h+"px",d.appendChild(e),a.initialize(e),d},EPUBJS.Book.prototype.generatePageList=function(a,b){{var c=[],d=new EPUBJS.Renderer(this.settings.render_method,!1),e=this.createHiddenRender(d,a,b),f=new RSVP.defer,g=-1,h=this.spine.length,i=0,j=function(a){var b,e=g+1,f=a||new RSVP.defer;return e>=h?f.resolve():(g=e,b=new EPUBJS.Chapter(this.spine[g],this.store),d.displayChapter(b,this.globalLayoutProperties).then(function(){d.pageMap.forEach(function(a){i+=1,c.push({cfi:a.start,page:i})}),d.pageMap.length%2>0&&d.spreads&&(i+=1,c.push({cfi:d.pageMap[d.pageMap.length-1].end,page:i})),setTimeout(function(){j(f)},1)})),f.promise}.bind(this);j().then(function(){d.remove(),this.element.removeChild(e),f.resolve(c)}.bind(this))}return f.promise},EPUBJS.Book.prototype.generatePagination=function(a,b){var c=this,d=new RSVP.defer;return this.ready.spine.promise.then(function(){c.generatePageList(a,b).then(function(a){c.pageList=c.contents.pageList=a,c.pagination.process(a),c.ready.pageList.resolve(c.pageList),d.resolve(c.pageList)})}),d.promise},EPUBJS.Book.prototype.loadPagination=function(a){var b=JSON.parse(a);return b&&b.length&&(this.pageList=b,this.pagination.process(this.pageList),this.ready.pageList.resolve(this.pageList)),this.pageList},EPUBJS.Book.prototype.getPageList=function(){return this.ready.pageList.promise},EPUBJS.Book.prototype.getMetadata=function(){return this.ready.metadata.promise},EPUBJS.Book.prototype.getToc=function(){return this.ready.toc.promise
},EPUBJS.Book.prototype.networkListeners=function(){var a=this;window.addEventListener("offline",function(){a.online=!1,a.trigger("book:offline")},!1),window.addEventListener("online",function(){a.online=!0,a.trigger("book:online")},!1)},EPUBJS.Book.prototype.listenToRenderer=function(a){var b=this;a.Events.forEach(function(c){a.on(c,function(a){b.trigger(c,a)})}),a.on("renderer:visibleRangeChanged",function(a){var b,c,d,e=[];this.pageList.length>0&&(b=this.pagination.pageFromCfi(a.start),d=this.pagination.percentageFromPage(b),e.push(b),a.end&&(c=this.pagination.pageFromCfi(a.end),e.push(c)),this.trigger("book:pageChanged",{anchorPage:b,percentage:d,pageRange:e}))}.bind(this)),a.on("render:loaded",this.loadChange.bind(this))},EPUBJS.Book.prototype.loadChange=function(a){var b,c=EPUBJS.core.uri(a);this.currentChapter&&(b=EPUBJS.core.uri(this.currentChapter.absolute)),!this._rendering&&this.currentChapter&&c.path!=b.path&&(console.warn("Miss Match",c.path,this.currentChapter.absolute),this.goto(c.filename))},EPUBJS.Book.prototype.unlistenToRenderer=function(a){a.Events.forEach(function(b){a.off(b)})},EPUBJS.Book.prototype.loadXml=function(a){return this.settings.fromStorage?this.storage.getXml(a,this.settings.encoding):this.settings.contained?this.zip.getXml(a,this.settings.encoding):EPUBJS.core.request(a,"xml",this.settings.withCredentials)},EPUBJS.Book.prototype.urlFrom=function(a){var b,c=EPUBJS.core.uri(a),d=c.protocol,e="/"==c.path[0],f=window.location,g=f.origin||f.protocol+"//"+f.host,h=document.getElementsByTagName("base");return h.length&&(b=h[0].href),c.protocol?c.origin+c.path:!d&&e?(b||g)+c.path:d||e?void 0:EPUBJS.core.resolveUrl(b||f.pathname,c.path)},EPUBJS.Book.prototype.unarchive=function(a){return this.zip=new EPUBJS.Unarchiver,this.store=this.zip,this.zip.openZip(a)},EPUBJS.Book.prototype.isContained=function(a){var b=EPUBJS.core.uri(a);return!b.extension||"epub"!=b.extension&&"zip"!=b.extension?!1:!0},EPUBJS.Book.prototype.isSaved=function(a){var b;return localStorage?(b=localStorage.getItem(a),localStorage&&null!==b?!0:!1):!1},EPUBJS.Book.prototype.generateBookKey=function(a){return"epubjs:"+EPUBJS.VERSION+":"+window.location.host+":"+a},EPUBJS.Book.prototype.saveContents=function(){return localStorage?void localStorage.setItem(this.settings.bookKey,JSON.stringify(this.contents)):!1},EPUBJS.Book.prototype.removeSavedContents=function(){return localStorage?void localStorage.removeItem(this.settings.bookKey):!1},EPUBJS.Book.prototype.renderTo=function(a){var b,c=this;if(_.isElement(a))this.element=a;else{if("string"!=typeof a)return void console.error("Not an Element");this.element=EPUBJS.core.getEl(a)}return b=this.opened.then(function(){return c.renderer.initialize(c.element,c.settings.width,c.settings.height),c._rendered(),c.startDisplay()})},EPUBJS.Book.prototype.startDisplay=function(){var a;return a=this.settings.goto?this.goto(this.settings.goto):this.settings.previousLocationCfi?this.gotoCfi(this.settings.previousLocationCfi):this.displayChapter(this.spinePos)},EPUBJS.Book.prototype.restore=function(a){var b,c=this,d=["manifest","spine","metadata","cover","toc","spineNodeIndex","spineIndexByURL","globalLayoutProperties"],e=!1,f=this.generateBookKey(a),g=localStorage.getItem(f),h=d.length;if(this.settings.clearSaved&&(e=!0),!e&&"undefined"!=g&&null!==g)for(c.contents=JSON.parse(g),b=0;h>b;b++){var i=d[b];if(!c.contents[i]){e=!0;break}c[i]=c.contents[i]}return!e&&g&&this.contents&&this.settings.contentsPath?(this.settings.bookKey=f,this.ready.manifest.resolve(this.manifest),this.ready.spine.resolve(this.spine),this.ready.metadata.resolve(this.metadata),this.ready.cover.resolve(this.cover),this.ready.toc.resolve(this.toc),!0):!1},EPUBJS.Book.prototype.displayChapter=function(a,b,c){var d,e,f,g,h=this,i=c||new RSVP.defer;return this.isRendered?this._rendering||this._rendering?(this._displayQ.enqueue("displayChapter",[a,b,i]),i.promise):(_.isNumber(a)?f=a:(e=new EPUBJS.EpubCFI(a),f=e.spinePos),(0>f||f>=this.spine.length)&&(console.warn("Not A Valid Location"),f=0,b=!1,e=!1),g=new EPUBJS.Chapter(this.spine[f],this.store),this._rendering=!0,d=h.renderer.displayChapter(g,this.globalLayoutProperties),e?h.renderer.gotoCfi(e):b&&h.renderer.lastPage(),d.then(function(){h.spinePos=f,i.resolve(h.renderer),h.settings.fromStorage||h.settings.contained||h.preloadNextChapter(),h.currentChapter=g,h._rendering=!1,h._displayQ.dequeue(),0===h._displayQ.length()&&h._gotoQ.dequeue()},function(a){console.error("Could not load Chapter: "+g.absolute),h.trigger("book:chapterLoadFailed",g.absolute),h._rendering=!1,i.reject(a)}),i.promise):(this._q.enqueue("displayChapter",arguments),i.reject({message:"Rendering",stack:(new Error).stack}),i.promise)},EPUBJS.Book.prototype.nextPage=function(){var a;return this.isRendered?(a=this.renderer.nextPage(),a?void 0:this.nextChapter()):this._q.enqueue("nextPage",arguments)},EPUBJS.Book.prototype.prevPage=function(){var a;return this.isRendered?(a=this.renderer.prevPage(),a?void 0:this.prevChapter()):this._q.enqueue("prevPage",arguments)},EPUBJS.Book.prototype.nextChapter=function(){var a;if(this.spinePos<this.spine.length-1){for(a=this.spinePos+1;this.spine[a]&&this.spine[a].linear&&"no"==this.spine[a].linear;)a++;if(a<this.spine.length-1)return this.displayChapter(a);this.trigger("book:atEnd")}else this.trigger("book:atEnd")},EPUBJS.Book.prototype.prevChapter=function(){var a;if(this.spinePos>0){for(a=this.spinePos-1;this.spine[a]&&this.spine[a].linear&&"no"==this.spine[a].linear;)a--;if(a>=0)return this.displayChapter(a,!0);this.trigger("book:atStart")}else this.trigger("book:atStart")},EPUBJS.Book.prototype.getCurrentLocationCfi=function(){return this.isRendered?this.renderer.currentLocationCfi:!1},EPUBJS.Book.prototype.goto=function(a){return 0===a.indexOf("epubcfi(")?this.gotoCfi(a):a.indexOf("%")===a.length-1?this.gotoPercentage(parseInt(a.substring(0,a.length-1))/100):"number"==typeof a||isNaN(a)===!1?this.gotoPage(a):this.gotoHref(a)},EPUBJS.Book.prototype.gotoCfi=function(a,b){var c,d,e,f=b||new RSVP.defer;return this.isRendered?this._moving||this._rendering?(console.warn("Renderer is moving"),this._gotoQ.enqueue("gotoCfi",[a,f]),!1):(c=new EPUBJS.EpubCFI(a),d=c.spinePos,-1==d?!1:(e=this.spine[d],promise=f.promise,this._moving=!0,this.currentChapter&&this.spinePos===d?(this.renderer.gotoCfi(c),this._moving=!1,f.resolve(this.renderer.currentLocationCfi)):(e&&-1!=d||(d=0,e=this.spine[d]),this.currentChapter=new EPUBJS.Chapter(e,this.store),this.currentChapter&&(this.spinePos=d,render=this.renderer.displayChapter(this.currentChapter,this.globalLayoutProperties),this.renderer.gotoCfi(c),render.then(function(a){this._moving=!1,f.resolve(a.currentLocationCfi)}.bind(this)))),promise.then(function(){this._gotoQ.dequeue()}.bind(this)),promise)):(console.warn("Not yet Rendered"),this.settings.previousLocationCfi=a,!1)},EPUBJS.Book.prototype.gotoHref=function(a,b){var c,d,e,f,g,h=b||new RSVP.defer;return this.isRendered?this._moving||this._rendering?(this._gotoQ.enqueue("gotoHref",[a,h]),!1):(c=a.split("#"),d=c[0],e=c[1]||!1,f=d.replace(this.settings.contentsPath,""),g=this.spineIndexByURL[f],d||(g=this.currentChapter?this.currentChapter.spinePos:0),"number"!=typeof g?!1:this.currentChapter&&g==this.currentChapter.spinePos?(e?this.renderer.section(e):this.renderer.firstPage(),h.resolve(this.renderer.currentLocationCfi),h.promise.then(function(){this._gotoQ.dequeue()}.bind(this)),h.promise):this.displayChapter(g).then(function(){e&&this.renderer.section(e),h.resolve(this.renderer.currentLocationCfi)}.bind(this))):(this.settings.goto=a,!1)},EPUBJS.Book.prototype.gotoPage=function(a){var b=this.pagination.cfiFromPage(a);return this.gotoCfi(b)},EPUBJS.Book.prototype.gotoPercentage=function(a){var b=this.pagination.pageFromPercentage(a);return this.gotoPage(b)},EPUBJS.Book.prototype.preloadNextChapter=function(){var a,b=this.spinePos+1;return b>=this.spine.length?!1:(a=new EPUBJS.Chapter(this.spine[b]),void(a&&EPUBJS.core.request(a.absolute)))},EPUBJS.Book.prototype.storeOffline=function(){var a=this,b=_.values(this.manifest);return EPUBJS.storage.batch(b).then(function(){a.settings.stored=!0,a.trigger("book:stored")})},EPUBJS.Book.prototype.availableOffline=function(){return this.settings.stored>0?!0:!1},EPUBJS.Book.prototype.setStyle=function(a,b,c){var d=["color","background","background-color"];return this.isRendered?(this.settings.styles[a]=b,this.renderer.setStyle(a,b,c),void(-1===d.indexOf(a)&&(clearTimeout(this.reformatTimeout),this.reformatTimeout=setTimeout(function(){this.renderer.reformat()}.bind(this),10)))):this._q.enqueue("setStyle",arguments)},EPUBJS.Book.prototype.removeStyle=function(a){return this.isRendered?(this.renderer.removeStyle(a),this.renderer.reformat(),void delete this.settings.styles[a]):this._q.enqueue("removeStyle",arguments)},EPUBJS.Book.prototype.addHeadTag=function(a,b){return this.isRendered?void(this.settings.headTags[a]=b):this._q.enqueue("addHeadTag",arguments)},EPUBJS.Book.prototype.useSpreads=function(a){console.warn("useSpreads is deprecated, use forceSingle or set a layoutOveride instead"),this.forceSingle(a===!1?!0:!1)},EPUBJS.Book.prototype.forceSingle=function(a){this.renderer.forceSingle(a),this.settings.forceSingle=a,this.isRendered&&this.renderer.reformat()},EPUBJS.Book.prototype.setMinSpreadWidth=function(a){this.settings.minSpreadWidth=a,this.isRendered&&(this.renderer.setMinSpreadWidth(this.settings.minSpreadWidth),this.renderer.reformat())},EPUBJS.Book.prototype.setGap=function(a){this.settings.gap=a,this.isRendered&&(this.renderer.setGap(this.settings.gap),this.renderer.reformat())},EPUBJS.Book.prototype.unload=function(){this.settings.restore&&localStorage&&this.saveContents(),this.unlistenToRenderer(this.renderer),this.trigger("book:unload")},EPUBJS.Book.prototype.destroy=function(){window.removeEventListener("beforeunload",this.unload),this.currentChapter&&this.currentChapter.unload(),this.unload(),this.render&&this.render.remove()},EPUBJS.Book.prototype._ready=function(){this.trigger("book:ready")},EPUBJS.Book.prototype._rendered=function(){this.isRendered=!0,this.trigger("book:rendered"),this._q.flush()},EPUBJS.Book.prototype.applyStyles=function(a,b){a.applyStyles(this.settings.styles),b()},EPUBJS.Book.prototype.applyHeadTags=function(a,b){a.applyHeadTags(this.settings.headTags),b()},EPUBJS.Book.prototype._registerReplacements=function(a){a.registerHook("beforeChapterDisplay",this.applyStyles.bind(this,a),!0),a.registerHook("beforeChapterDisplay",this.applyHeadTags.bind(this,a),!0),a.registerHook("beforeChapterDisplay",EPUBJS.replace.hrefs.bind(this),!0),this._needsAssetReplacement()&&a.registerHook("beforeChapterDisplay",[EPUBJS.replace.head,EPUBJS.replace.resources,EPUBJS.replace.svg],!0)},EPUBJS.Book.prototype._needsAssetReplacement=function(){return this.settings.fromStorage?"filesystem"==this.storage.getStorageType()?!1:!0:this.settings.contained?!0:!1},EPUBJS.Book.prototype.parseLayoutProperties=function(a){var b=this.layoutOveride&&this.layoutOveride.layout||a.layout||"reflowable",c=this.layoutOveride&&this.layoutOveride.spread||a.spread||"auto",d=this.layoutOveride&&this.layoutOveride.orientation||a.orientation||"auto";return{layout:b,spread:c,orientation:d}},RSVP.EventTarget.mixin(EPUBJS.Book.prototype),RSVP.on("error",function(){}),RSVP.configure("instrument",!0),RSVP.on("rejected",function(a){console.error(a.detail.message,a.detail.stack)}),EPUBJS.Chapter=function(a,b){this.href=a.href,this.absolute=a.url,this.id=a.id,this.spinePos=a.index,this.cfiBase=a.cfiBase,this.properties=a.properties,this.manifestProperties=a.manifestProperties,this.linear=a.linear,this.pages=1,this.store=b,this.epubcfi=new EPUBJS.EpubCFI},EPUBJS.Chapter.prototype.contents=function(a){var b=a||this.store;return b?b.get(href):EPUBJS.core.request(href,"xml")},EPUBJS.Chapter.prototype.url=function(a){var b,c=new RSVP.defer,d=a||this.store,e=this;return d?this.tempUrl?(b=this.tempUrl,c.resolve(b)):d.getUrl(this.absolute).then(function(a){e.tempUrl=a,c.resolve(a)}):(b=this.absolute,c.resolve(b)),c.promise},EPUBJS.Chapter.prototype.setPages=function(a){this.pages=a},EPUBJS.Chapter.prototype.getPages=function(){return this.pages},EPUBJS.Chapter.prototype.getID=function(){return this.ID},EPUBJS.Chapter.prototype.unload=function(a){this.contents=null,this.tempUrl&&a&&(a.revokeUrl(this.tempUrl),this.tempUrl=!1)},EPUBJS.Chapter.prototype.cfiFromRange=function(a){var b,c,d,e,f,g;if(this.contents){if(c=EPUBJS.core.getElementXPath(a.startContainer),d=EPUBJS.core.getElementXPath(a.endContainer),e=this.contents.evaluate(c,this.contents,EPUBJS.core.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,a.collapsed||(f=this.contents.evaluate(d,this.contents,EPUBJS.core.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue),b=this.contents.createRange(),e)try{b.setStart(e,a.startOffset),!a.collapsed&&f&&b.setEnd(f,a.endOffset)}catch(h){console.log("missed"),e=!1}return e||(console.log("not found, try fuzzy match"),cleanStartTextContent=EPUBJS.core.cleanStringForXpath(a.startContainer.textContent),c="//text()[contains(.,"+cleanStartTextContent+")]",e=this.contents.evaluate(c,this.contents,EPUBJS.core.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,e&&(b.setStart(e,a.startOffset),a.collapsed||(g=EPUBJS.core.cleanStringForXpath(a.endContainer.textContent),d="//text()[contains(.,"+g+")]",f=this.contents.evaluate(d,this.contents,EPUBJS.core.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,f&&b.setEnd(f,a.endOffset)))),this.epubcfi.generateCfiFromRange(b,this.cfiBase)}};var EPUBJS=EPUBJS||{};EPUBJS.core={},EPUBJS.core.getEl=function(a){return document.getElementById(a)},EPUBJS.core.getEls=function(a){return document.getElementsByClassName(a)},EPUBJS.core.request=function(a,b,c){function d(){if(this.readyState===this.DONE)if(200===this.status||this.responseXML){var a;a="xml"==b?this.responseXML:"json"==b?JSON.parse(this.response):"blob"==b?e?this.response:new Blob([this.response]):this.response,g.resolve(a)}else g.reject({message:this.response,stack:(new Error).stack})}var e=window.URL,f=e?"blob":"arraybuffer",g=new RSVP.defer,h=new XMLHttpRequest,i=XMLHttpRequest.prototype;return"overrideMimeType"in i||Object.defineProperty(i,"overrideMimeType",{value:function(){}}),c&&(h.withCredentials=!0),h.open("GET",a,!0),h.onreadystatechange=d,"blob"==b&&(h.responseType=f),"json"==b&&h.setRequestHeader("Accept","application/json"),"xml"==b&&h.overrideMimeType("text/xml"),h.send(),g.promise},EPUBJS.core.toArray=function(a){var b=[];for(var c in a){var d;a.hasOwnProperty(c)&&(d=a[c],d.ident=c,b.push(d))}return b},EPUBJS.core.uri=function(a){var b,c,d,e={protocol:"",host:"",path:"",origin:"",directory:"",base:"",filename:"",extension:"",fragment:"",href:a},f=a.indexOf("://"),g=a.indexOf("?"),h=a.indexOf("#");return-1!=h&&(e.fragment=a.slice(h+1),a=a.slice(0,h)),-1!=g&&(e.search=a.slice(g+1),a=a.slice(0,g),href=a),-1!=f?(e.protocol=a.slice(0,f),b=a.slice(f+3),d=b.indexOf("/"),-1===d?(e.host=e.path,e.path=""):(e.host=b.slice(0,d),e.path=b.slice(d)),e.origin=e.protocol+"://"+e.host,e.directory=EPUBJS.core.folder(e.path),e.base=e.origin+e.directory):(e.path=a,e.directory=EPUBJS.core.folder(a),e.base=e.directory),e.filename=a.replace(e.base,""),c=e.filename.lastIndexOf("."),-1!=c&&(e.extension=e.filename.slice(c+1)),e},EPUBJS.core.folder=function(a){var b=a.lastIndexOf("/");if(-1==b)var c="";return c=a.slice(0,b+1)},EPUBJS.core.dataURLToBlob=function(a){var b,c,d,e,f,g=";base64,";if(-1==a.indexOf(g))return b=a.split(","),c=b[0].split(":")[1],d=b[1],new Blob([d],{type:c});b=a.split(g),c=b[0].split(":")[1],d=window.atob(b[1]),e=d.length,f=new Uint8Array(e);for(var h=0;e>h;++h)f[h]=d.charCodeAt(h);return new Blob([f],{type:c})},EPUBJS.core.addScript=function(a,b,c){var d,e;e=!1,d=document.createElement("script"),d.type="text/javascript",d.async=!1,d.src=a,d.onload=d.onreadystatechange=function(){e||this.readyState&&"complete"!=this.readyState||(e=!0,b&&b())},c=c||document.body,c.appendChild(d)},EPUBJS.core.addScripts=function(a,b,c){var d=a.length,e=0,f=function(){e++,d==e?b&&b():EPUBJS.core.addScript(a[e],f,c)};EPUBJS.core.addScript(a[e],f,c)},EPUBJS.core.addCss=function(a,b,c){var d,e;e=!1,d=document.createElement("link"),d.type="text/css",d.rel="stylesheet",d.href=a,d.onload=d.onreadystatechange=function(){e||this.readyState&&"complete"!=this.readyState||(e=!0,b&&b())},c=c||document.body,c.appendChild(d)},EPUBJS.core.prefixed=function(a){var b=["Webkit","Moz","O","ms"],c=a[0].toUpperCase()+a.slice(1),d=b.length;if("undefined"!=typeof document.body.style[a])return a;for(var e=0;d>e;e++)if("undefined"!=typeof document.body.style[b[e]+c])return b[e]+c;return a},EPUBJS.core.resolveUrl=function(a,b){var c,d,e=[],f=EPUBJS.core.uri(b),g=a.split("/");return f.host?b:(g.pop(),d=b.split("/"),d.forEach(function(a){".."===a?g.pop():e.push(a)}),c=g.concat(e),c.join("/"))},EPUBJS.core.uuid=function(){var a=(new Date).getTime(),b="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=(a+16*Math.random())%16|0;return a=Math.floor(a/16),("x"==b?c:7&c|8).toString(16)});return b},EPUBJS.core.insert=function(a,b,c){var d=EPUBJS.core.locationOf(a,b,c);return b.splice(d,0,a),d},EPUBJS.core.locationOf=function(a,b,c,d,e){var f,g=d||0,h=e||b.length,i=parseInt(g+(h-g)/2);return c||(c=function(a,b){return a>b?1:b>a?-1:(a=b)?0:void 0}),0>=h-g?i:(f=c(b[i],a),h-g===1?f>0?i:i+1:0===f?i:-1===f?EPUBJS.core.locationOf(a,b,c,i,h):EPUBJS.core.locationOf(a,b,c,g,i))},EPUBJS.core.indexOfSorted=function(a,b,c,d,e){var f,g=d||0,h=e||b.length,i=parseInt(g+(h-g)/2);return c||(c=function(a,b){return a>b?1:b>a?-1:(a=b)?0:void 0}),0>=h-g?-1:(f=c(b[i],a),h-g===1?0===f?i:-1:0===f?i:-1===f?EPUBJS.core.indexOfSorted(a,b,c,i,h):EPUBJS.core.indexOfSorted(a,b,c,g,i))},EPUBJS.core.queue=function(a){var b=[],c=a,d=function(a,c,d){return b.push({funcName:a,args:c,context:d}),b},e=function(){var a;b.length&&(a=b.shift(),c[a.funcName].apply(a.context||c,a.args))},f=function(){for(;b.length;)e()},g=function(){b=[]},h=function(){return b.length};return{enqueue:d,dequeue:e,flush:f,clear:g,length:h}},EPUBJS.core.getElementXPath=function(a){return a&&a.id?'//*[@id="'+a.id+'"]':EPUBJS.core.getElementTreeXPath(a)},EPUBJS.core.getElementTreeXPath=function(a){var b,c,d,e,f=[],g="http://www.w3.org/1999/xhtml"===a.ownerDocument.documentElement.getAttribute("xmlns");for(a.nodeType===Node.TEXT_NODE&&(b=EPUBJS.core.indexOfTextNode(a)+1,f.push("text()["+b+"]"),a=a.parentNode);a&&1==a.nodeType;a=a.parentNode){b=0;for(var h=a.previousSibling;h;h=h.previousSibling)h.nodeType!=Node.DOCUMENT_TYPE_NODE&&h.nodeName==a.nodeName&&++b;c=a.nodeName.toLowerCase(),d=g?"xhtml:"+c:c,e=b?"["+(b+1)+"]":"",f.splice(0,0,d+e)}return f.length?"./"+f.join("/"):null},EPUBJS.core.nsResolver=function(a){var b={xhtml:"http://www.w3.org/1999/xhtml",epub:"http://www.idpf.org/2007/ops"};return b[a]||null},EPUBJS.core.cleanStringForXpath=function(a){var b=a.match(/[^'"]+|['"]/g);return b=b.map(function(a){return"'"===a?'"\'"':'"'===a?"'\"'":"'"+a+"'"}),"concat('',"+b.join(",")+")"},EPUBJS.core.indexOfTextNode=function(a){for(var b,c=a.parentNode,d=c.childNodes,e=-1,f=0;f<d.length&&(b=d[f],b.nodeType===Node.TEXT_NODE&&e++,b!=a);f++);return e},EPUBJS.EpubCFI=function(a){return a?this.parse(a):void 0},EPUBJS.EpubCFI.prototype.generateChapterComponent=function(a,b,c){var d=parseInt(b),e=a+1,f="/"+e+"/";return f+=2*(d+1),c&&(f+="["+c+"]"),f},EPUBJS.EpubCFI.prototype.generatePathComponent=function(a){var b=[];return a.forEach(function(a){var c="";c+=2*(a.index+1),a.id&&(c+="["+a.id+"]"),b.push(c)}),b.join("/")},EPUBJS.EpubCFI.prototype.generateCfiFromElement=function(a,b){var c=this.pathTo(a),d=this.generatePathComponent(c);return d.length?"epubcfi("+b+"!"+d+"/1:0)":"epubcfi("+b+"!/4/)"},EPUBJS.EpubCFI.prototype.pathTo=function(a){for(var b,c=[];a&&null!==a.parentNode&&9!=a.parentNode.nodeType;)b=a.parentNode.children,c.unshift({id:a.id,tagName:a.tagName,index:b?Array.prototype.indexOf.call(b,a):0}),a=a.parentNode;return c},EPUBJS.EpubCFI.prototype.getChapterComponent=function(a){var b=a.split("!");return b[0]},EPUBJS.EpubCFI.prototype.getPathComponent=function(a){var b=a.split("!"),c=b[1]?b[1].split(":"):"";return c[0]},EPUBJS.EpubCFI.prototype.getCharecterOffsetComponent=function(a){var b=a.split(":");return b[1]||""},EPUBJS.EpubCFI.prototype.parse=function(a){var b,c,d,e,f,g,h,i,j,k={},l=function(a){var b,c,d,e;return b="element",c=parseInt(a)/2-1,d=a.match(/\[(.*)\]/),d&&d[1]&&(e=d[1]),{type:b,index:c,id:e||!1}};return"string"!=typeof a?{spinePos:-1}:(k.str=a,0===a.indexOf("epubcfi(")&&")"===a[a.length-1]&&(a=a.slice(8,a.length-1)),c=this.getChapterComponent(a),d=this.getPathComponent(a)||"",e=this.getCharecterOffsetComponent(a),c&&(b=c.split("/")[2]||"")?(k.spinePos=parseInt(b)/2-1||0,g=b.match(/\[(.*)\]/),k.spineId=g?g[1]:!1,-1!=d.indexOf(",")&&console.warn("CFI Ranges are not supported"),h=d.split("/"),i=h.pop(),k.steps=[],h.forEach(function(a){var b;a&&(b=l(a),k.steps.push(b))}),j=parseInt(i),isNaN(j)||k.steps.push(j%2===0?l(i):{type:"text",index:(j-1)/2}),f=e.match(/\[(.*)\]/),f&&f[1]?(k.characterOffset=parseInt(e.split("[")[0]),k.textLocationAssertion=f[1]):k.characterOffset=parseInt(e),k):{spinePos:-1})},EPUBJS.EpubCFI.prototype.addMarker=function(a,b,c){var d,e,f,g,h=b||document,i=c||this.createMarker(h);return"string"==typeof a&&(a=this.parse(a)),e=a.steps[a.steps.length-1],-1===a.spinePos?!1:(d=this.findParent(a,h))?(e&&"text"===e.type?(f=d.childNodes[e.index],a.characterOffset?(g=f.splitText(a.characterOffset),i.classList.add("EPUBJS-CFI-SPLIT"),d.insertBefore(i,g)):d.insertBefore(i,f)):d.insertBefore(i,d.firstChild),i):!1},EPUBJS.EpubCFI.prototype.createMarker=function(a){var b=a||document,c=b.createElement("span");return c.id="EPUBJS-CFI-MARKER:"+EPUBJS.core.uuid(),c.classList.add("EPUBJS-CFI-MARKER"),c},EPUBJS.EpubCFI.prototype.removeMarker=function(a,b){a.classList.contains("EPUBJS-CFI-SPLIT")?(nextSib=a.nextSibling,prevSib=a.previousSibling,nextSib&&prevSib&&3===nextSib.nodeType&&3===prevSib.nodeType&&(prevSib.textContent+=nextSib.textContent,a.parentNode.removeChild(nextSib)),a.parentNode.removeChild(a)):a.classList.contains("EPUBJS-CFI-MARKER")&&a.parentNode.removeChild(a)},EPUBJS.EpubCFI.prototype.findParent=function(a,b){var c,d,e,f=b||document,g=f.getElementsByTagName("html")[0],h=Array.prototype.slice.call(g.children);if("string"==typeof a&&(a=this.parse(a)),d=a.steps.slice(0),!d.length)return f.getElementsByTagName("body")[0];for(;d&&d.length>0;){if(c=d.shift(),"text"===c.type?(e=g.childNodes[c.index],g=e.parentNode||g):g=c.id?f.getElementById(c.id):h[c.index],"undefined"==typeof g)return console.error("No Element For",c,a.str),!1;h=Array.prototype.slice.call(g.children)}return g},EPUBJS.EpubCFI.prototype.compare=function(a,b){if("string"==typeof a&&(a=new EPUBJS.EpubCFI(a)),"string"==typeof b&&(b=new EPUBJS.EpubCFI(b)),a.spinePos>b.spinePos)return 1;if(a.spinePos<b.spinePos)return-1;for(var c=0;c<a.steps.length;c++){if(!b.steps[c])return 1;if(a.steps[c].index>b.steps[c].index)return 1;if(a.steps[c].index<b.steps[c].index)return-1}return a.steps.length<b.steps.length?-1:a.characterOffset>b.characterOffset?1:a.characterOffset<b.characterOffset?-1:0},EPUBJS.EpubCFI.prototype.generateCfiFromHref=function(a,b){var c,d,e=EPUBJS.core.uri(a),f=e.path,g=e.fragment,h=b.spineIndexByURL[f],i=new RSVP.defer,j=new EPUBJS.EpubCFI;return"undefined"!=typeof h&&(d=b.spine[h],c=b.loadXml(d.url),c.then(function(a){var b,c=a.getElementById(g);b=j.generateCfiFromElement(c,d.cfiBase),i.resolve(b)})),i.promise},EPUBJS.EpubCFI.prototype.generateCfiFromTextNode=function(a,b,c){var d=a.parentNode,e=this.pathTo(d),f=this.generatePathComponent(e),g=1+2*Array.prototype.indexOf.call(d.childNodes,a);return"epubcfi("+c+"!"+f+"/"+g+":"+(b||0)+")"},EPUBJS.EpubCFI.prototype.generateCfiFromRangeAnchor=function(a,b){var c=a.anchorNode,d=a.anchorOffset;return this.generateCfiFromTextNode(c,d,b)},EPUBJS.EpubCFI.prototype.generateCfiFromRange=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;if(c=a.startContainer,3===c.nodeType)d=c.parentNode,h=1+2*EPUBJS.core.indexOfTextNode(c),e=this.pathTo(d);else{if(a.collapsed)return this.generateCfiFromElement(c,b);e=this.pathTo(c)}return f=this.generatePathComponent(e),g=a.startOffset,a.collapsed?"epubcfi("+b+"!"+f+"/"+h+":"+g+")":(i=a.endContainer,3===i.nodeType?(j=i.parentNode,n=1+2*EPUBJS.core.indexOfTextNode(i),k=this.pathTo(j)):k=this.pathTo(i),l=this.generatePathComponent(k),m=a.endOffset,"epubcfi("+b+"!"+f+"/"+h+":"+g+","+l+"/"+n+":"+m+")")},EPUBJS.EpubCFI.prototype.generateXpathFromSteps=function(a){var b=[".","*"];return a.forEach(function(a){var c=a.index+1;b.push(a.id?"*[position()="+c+" and @id='"+a.id+"']":"text"===a.type?"text()["+c+"]":"*["+c+"]")}),b.join("/")},EPUBJS.EpubCFI.prototype.generateRangeFromCfi=function(a,b){var c,d,e,f,g=b||document,h=g.createRange();return"string"==typeof a&&(a=this.parse(a)),-1===a.spinePos?!1:(d=this.generateXpathFromSteps(a.steps),c=a.steps[a.steps.length-1],(e=g.evaluate(d,g,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue)?(e&&a.characterOffset>=0?(f=e.length,a.characterOffset<f?(h.setStart(e,a.characterOffset),h.setEnd(e,f)):(console.debug("offset greater than length:",a.characterOffset,f),h.setStart(e,f-1),h.setEnd(e,f))):e&&h.selectNode(e),h):null)},EPUBJS.Events=function(a,b){return this.events={},this.el=b?b:document.createElement("div"),a.createEvent=this.createEvent,a.tell=this.tell,a.listen=this.listen,a.deafen=this.deafen,a.listenUntil=this.listenUntil,this},EPUBJS.Events.prototype.createEvent=function(a){var b=new CustomEvent(a);return this.events[a]=b,b},EPUBJS.Events.prototype.tell=function(a,b){var c;this.events[a]?c=this.events[a]:(console.warn("No event:",a,"defined yet, creating."),c=this.createEvent(a)),b&&(c.msg=b),this.el.dispatchEvent(c)},EPUBJS.Events.prototype.listen=function(a,b,c){return this.events[a]?void(c?this.el.addEventListener(a,b.bind(c),!1):this.el.addEventListener(a,b,!1)):(console.warn("No event:",a,"defined yet, creating."),void this.createEvent(a))},EPUBJS.Events.prototype.deafen=function(a,b){this.el.removeEventListener(a,b,!1)},EPUBJS.Events.prototype.listenUntil=function(a,b,c,d){function e(){this.deafen(a,c),this.deafen(b,e)}this.listen(a,c,d),this.listen(b,e,this)},EPUBJS.hooks={},EPUBJS.Hooks=function(){function a(){}return a.prototype.getHooks=function(){var a;this.hooks={},Array.prototype.slice.call(arguments).forEach(function(a){this.hooks[a]=[]},this);for(var b in this.hooks)a=_.values(EPUBJS.hooks[b]),a.forEach(function(a){this.registerHook(b,a)},this)},a.prototype.registerHook=function(a,b,c){"undefined"!=typeof this.hooks[a]?"function"==typeof b?c?this.hooks[a].unshift(b):this.hooks[a].push(b):Array.isArray(b)&&b.forEach(function(b){c?this.hooks[a].unshift(b):this.hooks[a].push(b)},this):this.hooks[a]=[func]},a.prototype.triggerHooks=function(a,b,c){function d(){f--,0>=f&&b&&b()}var e,f;return"undefined"==typeof this.hooks[a]?!1:(e=this.hooks[a],f=e.length,0===f&&b&&b(),void e.forEach(function(a){a(d,c)}))},{register:function(a){if(void 0===EPUBJS.hooks[a]&&(EPUBJS.hooks[a]={}),"object"!=typeof EPUBJS.hooks[a])throw"Already registered: "+a;return EPUBJS.hooks[a]},mixin:function(b){for(var c in a.prototype)b[c]=a.prototype[c]}}}(),EPUBJS.Layout=EPUBJS.Layout||{},EPUBJS.Layout.Reflowable=function(){this.documentElement=null,this.spreadWidth=null},EPUBJS.Layout.Reflowable.prototype.format=function(a,b,c,d){var e=EPUBJS.core.prefixed("columnAxis"),f=EPUBJS.core.prefixed("columnGap"),g=EPUBJS.core.prefixed("columnWidth"),h=EPUBJS.core.prefixed("columnFill"),i=Math.floor(b),j=Math.floor(i/8),k=d>=0?d:j%2===0?j:j-1;return this.documentElement=a,this.spreadWidth=i+k,a.style.overflow="hidden",a.style.width=i+"px",a.style.height=c+"px",a.style[e]="horizontal",a.style[h]="auto",a.style[g]=i+"px",a.style[f]=k+"px",this.colWidth=i,this.gap=k,{pageWidth:this.spreadWidth,pageHeight:c}},EPUBJS.Layout.Reflowable.prototype.calculatePages=function(){var a,b;return this.documentElement.style.width="auto",a=this.documentElement.scrollWidth,b=Math.ceil(a/this.spreadWidth),{displayedPages:b,pageCount:b}},EPUBJS.Layout.ReflowableSpreads=function(){this.documentElement=null,this.spreadWidth=null},EPUBJS.Layout.ReflowableSpreads.prototype.format=function(a,b,c,d){var e=EPUBJS.core.prefixed("columnAxis"),f=EPUBJS.core.prefixed("columnGap"),g=EPUBJS.core.prefixed("columnWidth"),h=EPUBJS.core.prefixed("columnFill"),i=2,j=Math.floor(b),k=j%2===0?j:j-1,l=Math.floor(k/8),m=d>=0?d:l%2===0?l:l-1,n=Math.floor((k-m)/i);return this.documentElement=a,this.spreadWidth=(n+m)*i,a.style.overflow="hidden",a.style.width=k+"px",a.style.height=c+"px",a.style[e]="horizontal",a.style[h]="auto",a.style[f]=m+"px",a.style[g]=n+"px",this.colWidth=n,this.gap=m,{pageWidth:this.spreadWidth,pageHeight:c}},EPUBJS.Layout.ReflowableSpreads.prototype.calculatePages=function(){var a=this.documentElement.scrollWidth,b=Math.ceil(a/this.spreadWidth);return this.documentElement.style.width=a+this.spreadWidth+"px",{displayedPages:b,pageCount:2*b}},EPUBJS.Layout.Fixed=function(){this.documentElement=null},EPUBJS.Layout.Fixed=function(a){var b,c,d,e,f=EPUBJS.core.prefixed("columnWidth"),g=a.querySelector("[name=viewport");return this.documentElement=a,g&&g.hasAttribute("content")&&(b=g.getAttribute("content"),c=b.split(","),c[0]&&(d=c[0].replace("width=","")),c[1]&&(e=c[1].replace("height=",""))),a.style.width=d+"px"||"auto",a.style.height=e+"px"||"auto",a.style[f]="auto",a.style.overflow="auto",this.colWidth=d,this.gap=0,{pageWidth:d,pageHeight:e}},EPUBJS.Layout.Fixed.prototype.calculatePages=function(){return{displayedPages:1,pageCount:1}},EPUBJS.Pagination=function(a){this.pages=[],this.locations=[],this.epubcfi=new EPUBJS.EpubCFI,a&&a.length&&this.process(a)},EPUBJS.Pagination.prototype.process=function(a){a.forEach(function(a){this.pages.push(a.page),this.locations.push(a.cfi)},this),this.pageList=a,this.firstPage=parseInt(this.pages[0]),this.lastPage=parseInt(this.pages[this.pages.length-1]),this.totalPages=this.lastPage-this.firstPage},EPUBJS.Pagination.prototype.pageFromCfi=function(a){var b=-1;if(0===this.locations.length)return-1;var c=EPUBJS.core.indexOfSorted(a,this.locations,this.epubcfi.compare);return-1!=c&&c<this.pages.length-1?b=this.pages[c]:(c=EPUBJS.core.locationOf(a,this.locations,this.epubcfi.compare),b=c-1>=0?this.pages[c-1]:this.pages[0],b=this.pages[c],void 0!==b||(b=-1)),b},EPUBJS.Pagination.prototype.cfiFromPage=function(a){var b=-1;"number"!=typeof a&&(a=parseInt(a));var c=this.pages.indexOf(a);return-1!=c&&(b=this.locations[c]),b},EPUBJS.Pagination.prototype.pageFromPercentage=function(a){var b=Math.round(this.totalPages*a);return b},EPUBJS.Pagination.prototype.percentageFromPage=function(a){var b=(a-this.firstPage)/this.totalPages;return Math.round(1e3*b)/1e3},EPUBJS.Pagination.prototype.percentageFromCfi=function(a){var b=this.pageFromCfi(a),c=this.percentageFromPage(b);return c},EPUBJS.Parser=function(a){this.baseUrl=a||""},EPUBJS.Parser.prototype.container=function(a){var b,c,d,e;return a?(b=a.querySelector("rootfile"))?(c=b.getAttribute("full-path"),d=EPUBJS.core.uri(c).directory,e=a.xmlEncoding,{packagePath:c,basePath:d,encoding:e}):void console.error("No RootFile Found"):void console.error("Container File Not Found")},EPUBJS.Parser.prototype.identifier=function(a){var b;return a?(b=a.querySelector("metadata"),b?this.getElementText(b,"identifier"):void console.error("No Metadata Found")):void console.error("Package File Not Found")},EPUBJS.Parser.prototype.packageContents=function(a,b){var c,d,e,f,g,h,i,j,k,l,m=this;return b&&(this.baseUrl=b),a?(c=a.querySelector("metadata"))?(d=a.querySelector("manifest"))?(e=a.querySelector("spine"))?(f=m.manifest(d),g=m.findNavPath(d),h=m.findTocPath(d),i=m.findCoverPath(d),j=Array.prototype.indexOf.call(e.parentNode.childNodes,e),k=m.spine(e,f),l={},k.forEach(function(a){l[a.href]=a.index
}),{metadata:m.metadata(c),spine:k,manifest:f,navPath:g,tocPath:h,coverPath:i,spineNodeIndex:j,spineIndexByURL:l}):void console.error("No Spine Found"):void console.error("No Manifest Found"):void console.error("No Metadata Found"):void console.error("Package File Not Found")},EPUBJS.Parser.prototype.findNavPath=function(a){var b=a.querySelector("item[properties^='nav']");return b?b.getAttribute("href"):!1},EPUBJS.Parser.prototype.findTocPath=function(a){var b=a.querySelector("item[media-type='application/x-dtbncx+xml']");return b?b.getAttribute("href"):!1},EPUBJS.Parser.prototype.findCoverPath=function(a){var b=a.querySelector("item[properties='cover-image']");return b?b.getAttribute("href"):!1},EPUBJS.Parser.prototype.metadata=function(a){var b={},c=this;return b.bookTitle=c.getElementText(a,"title"),b.creator=c.getElementText(a,"creator"),b.description=c.getElementText(a,"description"),b.pubdate=c.getElementText(a,"date"),b.publisher=c.getElementText(a,"publisher"),b.identifier=c.getElementText(a,"identifier"),b.language=c.getElementText(a,"language"),b.rights=c.getElementText(a,"rights"),b.modified_date=c.querySelectorText(a,"meta[property='dcterms:modified']"),b.layout=c.querySelectorText(a,"meta[property='rendition:layout']"),b.orientation=c.querySelectorText(a,"meta[property='rendition:orientation']"),b.spread=c.querySelectorText(a,"meta[property='rendition:spread']"),b},EPUBJS.Parser.prototype.getElementText=function(a,b){var c,d=a.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/",b);return d&&0!==d.length?(c=d[0],c.childNodes.length?c.childNodes[0].nodeValue:""):""},EPUBJS.Parser.prototype.querySelectorText=function(a,b){var c=a.querySelector(b);return c&&c.childNodes.length?c.childNodes[0].nodeValue:""},EPUBJS.Parser.prototype.manifest=function(a){var b=this.baseUrl,c={},d=a.querySelectorAll("item"),e=Array.prototype.slice.call(d);return e.forEach(function(a){var d=a.getAttribute("id"),e=a.getAttribute("href")||"",f=a.getAttribute("media-type")||"",g=a.getAttribute("properties")||"";c[d]={href:e,url:b+e,type:f,properties:g}}),c},EPUBJS.Parser.prototype.spine=function(a,b){var c=[],d=a.getElementsByTagName("itemref"),e=Array.prototype.slice.call(d),f=Array.prototype.indexOf.call(a.parentNode.childNodes,a),g=new EPUBJS.EpubCFI;return e.forEach(function(a,d){var e=a.getAttribute("idref"),h=g.generateChapterComponent(f,d,e),i=a.getAttribute("properties")||"",j=i.length?i.split(" "):[],k=b[e].properties,l=k.length?k.split(" "):[],m={id:e,linear:a.getAttribute("linear")||"",properties:j,manifestProperties:l,href:b[e].href,url:b[e].url,index:d,cfiBase:h,cfi:"epub("+h+")"};c.push(m)}),c},EPUBJS.Parser.prototype.nav=function(a,b,c){function d(a){var b=[];return Array.prototype.slice.call(a.childNodes).forEach(function(a){"ol"==a.tagName&&Array.prototype.slice.call(a.childNodes).forEach(function(a){"li"==a.tagName&&b.push(a)})}),b}function e(a){var b=null;return Array.prototype.slice.call(a.childNodes).forEach(function(a){("a"==a.tagName||"span"==a.tagName)&&(b=a)}),b}function f(a){var g=[],i=d(a),j=Array.prototype.slice.call(i),k=j.length;return 0===k?!1:(j.forEach(function(d){var i=d.getAttribute("id")||!1,j=e(d),k=j.getAttribute("href")||"",l=j.textContent||"",m=k.split("#"),n=m[0],o=f(d),p=b[n],q=c[p],r=q?q.cfi:"";i||(p?(q=c[p],i=q.id,r=q.cfi):i="epubjs-autogen-toc-id-"+h++),d.setAttribute("id",i),g.push({id:i,href:k,label:l,subitems:o,parent:a?a.getAttribute("id"):null,cfi:r})}),g)}var g=a.querySelector('nav[*|type="toc"]'),h=0;return g?f(g):[]},EPUBJS.Parser.prototype.toc=function(a,b,c){function d(a){var e=[],f=a.querySelectorAll("navPoint"),g=Array.prototype.slice.call(f).reverse(),h=g.length;return 0===h?[]:(g.forEach(function(f){var g=f.getAttribute("id")||!1,h=f.querySelector("content"),i=h.getAttribute("src"),j=f.querySelector("navLabel"),k=j.textContent?j.textContent:"",l=i.split("#"),m=l[0],n=b[m],o=c[n],p=d(f),q=o?o.cfi:"";g||(n?(o=c[n],g=o.id,q=o.cfi):g="epubjs-autogen-toc-id-"+idCounter++),e.unshift({id:g,href:i,label:k,spinePos:n,subitems:p,parent:a?a.getAttribute("id"):null,cfi:q})}),e)}var e=a.querySelector("navMap");return e?d(e):[]},EPUBJS.Parser.prototype.pageList=function(a){function b(a){var b=[];return Array.prototype.slice.call(a.childNodes).forEach(function(a){"ol"==a.tagName&&Array.prototype.slice.call(a.childNodes).forEach(function(a){"li"==a.tagName&&b.push(a)})}),b}function c(a){var b=null;return Array.prototype.slice.call(a.childNodes).forEach(function(a){("a"==a.tagName||"span"==a.tagName)&&(b=a)}),b}function d(a){var d=[],e=b(a),f=Array.prototype.slice.call(e),g=f.length;return 0===g?!1:(f.forEach(function(a){var b,e,f,g=(a.getAttribute("id")||!1,c(a)),h=g.getAttribute("href")||"",i=g.textContent||"",j=parseInt(i),k=h.indexOf("epubcfi");-1!=k?(b=h.split("#"),e=b[0],f=b.length>1?b[1]:!1,d.push({cfi:f,href:h,packageUrl:e,page:j})):d.push({href:h,page:j})}),d)}var e=a.querySelector('nav[*|type="page-list"]');return e?d(e):[]},EPUBJS.Render.Iframe=function(){this.iframe=null,this.document=null,this.window=null,this.docEl=null,this.bodyEl=null,this.leftPos=0,this.pageWidth=0},EPUBJS.Render.Iframe.prototype.create=function(){return this.iframe=document.createElement("iframe"),this.iframe.id="epubjs-iframe:"+EPUBJS.core.uuid(),this.iframe.scrolling="no",this.iframe.seamless="seamless",this.iframe.style.border="none",this.iframe.addEventListener("load",this.loaded.bind(this),!1),this.iframe},EPUBJS.Render.Iframe.prototype.load=function(a){var b=this,c=new RSVP.defer;return this.iframe.contentWindow.location.replace(a),b.leftPos=0,this.window&&this.unload(),this.iframe.onload=function(){b.document=b.iframe.contentDocument,b.docEl=b.document.documentElement,b.headEl=b.document.head,b.bodyEl=b.document.body,b.window=b.iframe.contentWindow,b.window.addEventListener("resize",b.resized.bind(b),!1),b.bodyEl&&(b.bodyEl.style.margin="0"),c.resolve(b.docEl)},this.iframe.onerror=function(a){c.reject({message:"Error Loading Contents: "+a,stack:(new Error).stack})},c.promise},EPUBJS.Render.Iframe.prototype.loaded=function(){var a=this.iframe.contentWindow.location.href;"about:blank"!=a&&this.trigger("render:loaded",a)},EPUBJS.Render.Iframe.prototype.resize=function(a,b){this.iframe&&(this.iframe.height=b,isNaN(a)||a%2===0||(a+=1),this.iframe.width=a,this.width=this.iframe.getBoundingClientRect().width||a,this.height=this.iframe.getBoundingClientRect().height||b)},EPUBJS.Render.Iframe.prototype.resized=function(){this.width=this.iframe.getBoundingClientRect().width,this.height=this.iframe.getBoundingClientRect().height},EPUBJS.Render.Iframe.prototype.totalWidth=function(){return this.docEl.scrollWidth},EPUBJS.Render.Iframe.prototype.totalHeight=function(){return this.docEl.scrollHeight},EPUBJS.Render.Iframe.prototype.setPageDimensions=function(a,b){this.pageWidth=a,this.pageHeight=b},EPUBJS.Render.Iframe.prototype.setLeft=function(a){this.document.defaultView.scrollTo(a,0)},EPUBJS.Render.Iframe.prototype.setStyle=function(a,b,c){c&&(a=EPUBJS.core.prefixed(a)),this.bodyEl&&(this.bodyEl.style[a]=b)},EPUBJS.Render.Iframe.prototype.removeStyle=function(a){this.bodyEl&&(this.bodyEl.style[a]="")},EPUBJS.Render.Iframe.prototype.addHeadTag=function(a,b){var c=document.createElement(a);for(var d in b)c[d]=b[d];this.headEl&&this.headEl.appendChild(c)},EPUBJS.Render.Iframe.prototype.page=function(a){this.leftPos=this.pageWidth*(a-1),this.setLeft(this.leftPos)},EPUBJS.Render.Iframe.prototype.getPageNumberByElement=function(a){var b,c;if(a)return b=this.leftPos+a.getBoundingClientRect().left,c=Math.floor(b/this.pageWidth)+1},EPUBJS.Render.Iframe.prototype.getPageNumberByRect=function(a){var b,c;return b=this.leftPos+a.left,c=Math.floor(b/this.pageWidth)+1},EPUBJS.Render.Iframe.prototype.getBaseElement=function(){return this.bodyEl},EPUBJS.Render.Iframe.prototype.isElementVisible=function(a){var b,c;return a&&"function"==typeof a.getBoundingClientRect&&(b=a.getBoundingClientRect(),c=b.left,0!==b.width&&0!==b.height&&c>=0&&c<this.pageWidth)?!0:!1},EPUBJS.Render.Iframe.prototype.scroll=function(a){this.iframe.scrolling=a?"yes":"no"},EPUBJS.Render.Iframe.prototype.unload=function(){this.window.removeEventListener("resize",this.resized)},RSVP.EventTarget.mixin(EPUBJS.Render.Iframe.prototype),EPUBJS.Renderer=function(a,b){this.listenedEvents=["keydown","keyup","keypressed","mouseup","mousedown","click"],this.upEvent="mouseup",this.downEvent="mousedown","ontouchstart"in document.documentElement&&(this.listenedEvents.push("touchstart","touchend"),this.upEvent="touchend",this.downEvent="touchstart"),a&&"undefined"!=typeof EPUBJS.Render[a]?this.render=new EPUBJS.Render[a]:console.error("Not a Valid Rendering Method"),this.render.on("render:loaded",this.loaded.bind(this)),this.caches={},this.epubcfi=new EPUBJS.EpubCFI,this.spreads=!0,this.isForcedSingle=!1,this.resized=_.debounce(this.onResized.bind(this),100),this.layoutSettings={},this.hidden=b||!1,EPUBJS.Hooks.mixin(this),this.getHooks("beforeChapterDisplay"),this._q=EPUBJS.core.queue(this),this._moving=!1},EPUBJS.Renderer.prototype.Events=["renderer:keydown","renderer:keyup","renderer:keypressed","renderer:mouseup","renderer:mousedown","renderer:click","renderer:touchstart","renderer:touchend","renderer:selected","renderer:chapterUnloaded","renderer:chapterDisplayed","renderer:locationChanged","renderer:visibleLocationChanged","renderer:resized","renderer:spreads"],EPUBJS.Renderer.prototype.initialize=function(a,b,c){this.container=a,this.element=this.render.create(),this.initWidth=b,this.initHeight=c,this.width=b||this.container.clientWidth,this.height=c||this.container.clientHeight,this.container.appendChild(this.element),b&&c?this.render.resize(this.width,this.height):this.render.resize("100%","100%")},EPUBJS.Renderer.prototype.displayChapter=function(a,b){return this._moving?void console.error("Rendering In Progress"):(this._moving=!0,a.url().then(function(c){return this.currentChapter&&(this.currentChapter.unload(),this.render.window&&this.render.window.removeEventListener("resize",this.resized),this.removeEventListeners(),this.removeSelectionListeners(),this.trigger("renderer:chapterUnloaded"),this.contents=null,this.doc=null,this.pageMap=null),this.currentChapter=a,this.chapterPos=1,this.currentChapterCfiBase=a.cfiBase,this.layoutSettings=this.reconcileLayoutSettings(b,a.properties),this.load(c)}.bind(this)))},EPUBJS.Renderer.prototype.load=function(a){var b=new RSVP.defer;return this.layoutMethod=this.determineLayout(this.layoutSettings),this.layout=new EPUBJS.Layout[this.layoutMethod],this.visible(!1),render=this.render.load(a),render.then(function(a){this.currentChapter.contents=this.render.document,this.contents=a,this.doc=this.render.document,this.formated=this.layout.format(a,this.render.width,this.render.height,this.gap),this.render.setPageDimensions(this.formated.pageWidth,this.formated.pageHeight),this.initWidth||this.initHeight||this.render.window.addEventListener("resize",this.resized,!1),this.addEventListeners(),this.addSelectionListeners(),this.beforeDisplay(function(){var a=this.layout.calculatePages(),c=this.currentChapter,d=this._q.length();this._moving=!1,this.updatePages(a),this.visibleRangeCfi=this.getVisibleRangeCfi(),this.currentLocationCfi=this.visibleRangeCfi.start,0===d&&(this.trigger("renderer:locationChanged",this.currentLocationCfi),this.trigger("renderer:visibleRangeChanged",this.visibleRangeCfi)),c.cfi=this.currentLocationCfi,this.trigger("renderer:chapterDisplayed",c),this.visible(!0),b.resolve(this)}.bind(this))}.bind(this)),b.promise},EPUBJS.Renderer.prototype.loaded=function(a){this.trigger("render:loaded",a)},EPUBJS.Renderer.prototype.reconcileLayoutSettings=function(a,b){var c={};for(var d in a)a.hasOwnProperty(d)&&(c[d]=a[d]);return b.forEach(function(a){var b,d,e=a.replace("rendition:",""),f=e.indexOf("-");-1!=f&&(b=e.slice(0,f),d=e.slice(f+1),c[b]=d)}),c},EPUBJS.Renderer.prototype.determineLayout=function(a){var b=this.determineSpreads(this.minSpreadWidth),c=b?"ReflowableSpreads":"Reflowable",d=!1;return"pre-paginated"===a.layout&&(c="Fixed",d=!0,b=!1),"reflowable"===a.layout&&"none"===a.spread&&(c="Reflowable",d=!1,b=!1),"reflowable"===a.layout&&"both"===a.spread&&(c="ReflowableSpreads",d=!1,b=!0),this.spreads=b,this.render.scroll(d),this.trigger("renderer:spreads",b),c},EPUBJS.Renderer.prototype.beforeDisplay=function(a){this.triggerHooks("beforeChapterDisplay",a,this)},EPUBJS.Renderer.prototype.updatePages=function(){this.pageMap=this.mapPage(),this.displayedPages=this.spreads?Math.ceil(this.pageMap.length/2):this.pageMap.length,this.currentChapter.pages=this.pageMap.length,this._q.flush()},EPUBJS.Renderer.prototype.reformat=function(){var a,b=this;this.contents&&(spreads=this.determineSpreads(this.minSpreadWidth),spreads!=this.spreads&&(this.spreads=spreads,this.layoutMethod=this.determineLayout(this.layoutSettings),this.layout=new EPUBJS.Layout[this.layoutMethod]),this.formated=this.layout.format(this.contents,this.render.width,this.render.height,this.gap),this.render.setPageDimensions(this.formated.pageWidth,this.formated.pageHeight),a=b.layout.calculatePages(),b.updatePages(a),clearTimeout(this.timeoutTillCfi),this.timeoutTillCfi=setTimeout(function(){b.currentLocationCfi&&b.gotoCfi(b.currentLocationCfi),this.timeoutTillCfi=null},10))},EPUBJS.Renderer.prototype.visible=function(a){return"undefined"==typeof a?this.element.style.visibility:void(a!==!0||this.hidden?a===!1&&(this.element.style.visibility="hidden"):this.element.style.visibility="visible")},EPUBJS.Renderer.prototype.remove=function(){this.render.window&&(this.render.unload(),this.render.window.removeEventListener("resize",this.resized),this.removeEventListeners(),this.removeSelectionListeners()),this.container.removeChild(this.element)},EPUBJS.Renderer.prototype.applyStyles=function(a){for(var b in a)this.render.setStyle(b,a[b])},EPUBJS.Renderer.prototype.setStyle=function(a,b,c){this.render.setStyle(a,b,c)},EPUBJS.Renderer.prototype.removeStyle=function(a){this.render.removeStyle(a)},EPUBJS.Renderer.prototype.applyHeadTags=function(a){for(var b in a)this.render.addHeadTag(b,a[b])},EPUBJS.Renderer.prototype.page=function(a){return this.pageMap?a>=1&&a<=this.displayedPages?(this.chapterPos=a,this.render.page(a),this.visibleRangeCfi=this.getVisibleRangeCfi(),this.currentLocationCfi=this.visibleRangeCfi.start,this.trigger("renderer:locationChanged",this.currentLocationCfi),this.trigger("renderer:visibleRangeChanged",this.visibleRangeCfi),!0):!1:(console.warn("pageMap not set, queuing"),this._q.enqueue("page",arguments),!0)},EPUBJS.Renderer.prototype.nextPage=function(){return this.page(this.chapterPos+1)},EPUBJS.Renderer.prototype.prevPage=function(){return this.page(this.chapterPos-1)},EPUBJS.Renderer.prototype.pageByElement=function(a){var b;a&&(b=this.render.getPageNumberByElement(a),this.page(b))},EPUBJS.Renderer.prototype.lastPage=function(){return this._moving?this._q.enqueue("lastPage",arguments):void this.page(this.displayedPages)},EPUBJS.Renderer.prototype.firstPage=function(){this.page(1)},EPUBJS.Renderer.prototype.section=function(a){var b=this.doc.getElementById(a);b&&this.pageByElement(b)},EPUBJS.Renderer.prototype.firstElementisTextNode=function(a){var b=a.childNodes,c=b.length;return c&&b[0]&&3===b[0].nodeType&&b[0].textContent.trim().length?!0:!1},EPUBJS.Renderer.prototype.walk=function(a,b,c){for(var d,e,f,g,h=a,i=[h],j=1e4,k=0;!d&&i.length;){if(a=i.shift(),this.containsPoint(a,b,c)&&this.firstElementisTextNode(a)&&(d=a),!d&&a&&a.childElementCount>0){if(e=a.children,!e||!e.length)return d;f=e.length?e.length:0;for(var l=f-1;l>=0;l--)e[l]!=g&&i.unshift(e[l])}if(!d&&0===i.length&&h&&null!==h.parentNode&&(i.push(h.parentNode),g=h,h=h.parentNode),k++,k>j){console.error("ENDLESS LOOP");break}}return d},EPUBJS.Renderer.prototype.containsPoint=function(a,b){var c;return a&&"function"==typeof a.getBoundingClientRect&&(c=a.getBoundingClientRect(),0!==c.width&&0!==c.height&&c.left>=b&&b<=c.left+c.width)?!0:!1},EPUBJS.Renderer.prototype.textSprint=function(a,b){for(var c,d=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:function(a){return/^\s*$/.test(a.data)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}},!1);c=d.nextNode();)b(c)},EPUBJS.Renderer.prototype.sprint=function(a,b){for(var c,d=document.createTreeWalker(a,NodeFilter.SHOW_ELEMENT,null,!1);c=d.nextNode();)b(c)},EPUBJS.Renderer.prototype.mapPage=function(){var a,b,c=this,d=[{start:null,end:null}],e=this.render.getBaseElement(),f=1,g=this.layout.colWidth+this.layout.gap,h=this.formated.pageWidth*(this.chapterPos-1),i=g*f-h,j=0,k=function(a){var b,c,d=Array.prototype.slice.call(a.childNodes);if(a.nodeType==Node.ELEMENT_NODE){if(c=document.createRange(),c.selectNodeContents(a),b=c.getBoundingClientRect(),!b||0===b.width&&0===b.height)return;b.left>j&&d.forEach(function(a){a.nodeType==Node.TEXT_NODE&&a.textContent.trim().length&&l(a)}),b.right>j&&d.forEach(function(a){a.nodeType==Node.TEXT_NODE&&a.textContent.trim().length&&l(a)})}},l=function(e){var k=c.splitTextNodeIntoWordsRanges(e);k.forEach(function(e){var k=e.getBoundingClientRect();!k||0===k.width&&0===k.height||(k.left+k.width<i?d[f-1].start||(e.collapse(!0),b=c.currentChapter.cfiFromRange(e),d[f-1].start=b):(a&&(a.collapse(!0),b=c.currentChapter.cfiFromRange(a),d[f-1].end=b),e.collapse(!0),b=c.currentChapter.cfiFromRange(e),d.push({start:b,end:null}),f+=1,i=g*f-h,j=i),a=e)})};return this.sprint(e,k),a&&(a.collapse(!0),b=c.currentChapter.cfiFromRange(a),d[f-1].end=b),1!==d.length||d[0].start||(range=this.doc.createRange(),range.selectNodeContents(e),range.collapse(!0),b=c.currentChapter.cfiFromRange(range),d[0].start=b,d[0].end=b),a=null,ranges=null,range=null,e=null,d},EPUBJS.Renderer.prototype.splitTextNodeIntoWordsRanges=function(a){var b,c=[],d=a.textContent.trim();if(pos=d.indexOf(" "),-1===pos)return b=this.doc.createRange(),b.selectNodeContents(a),[b];for(b=this.doc.createRange(),b.setStart(a,0),b.setEnd(a,pos),c.push(b),b=!1;-1!=pos;)pos=d.indexOf(" ",pos+1),pos>0&&(b&&(b.setEnd(a,pos),c.push(b)),b=this.doc.createRange(),b.setStart(a,pos+1));return b&&(b.setEnd(a,d.length),c.push(b)),c},EPUBJS.Renderer.prototype.rangePosition=function(a){var b,c;return c=a.getClientRects(),c.length?b=c[0]:null},EPUBJS.Renderer.prototype.getPageCfi=function(){var a;return this.spreads?(a=2*this.chapterPos,startRange=this.pageMap[a-2]):(a=this.chapterPos,startRange=this.pageMap[a-1]),this.pageMap[2*this.chapterPos-1].start},EPUBJS.Renderer.prototype.getRange=function(a,b,c){var d,e=this.doc.createRange();return c=!0,"undefined"==typeof document.caretPositionFromPoint||c?"undefined"==typeof document.caretRangeFromPoint||c?(this.visibileEl=this.findElementAfter(a,b),e.setStart(this.visibileEl,1)):e=this.doc.caretRangeFromPoint(a,b):(d=this.doc.caretPositionFromPoint(a,b),e.setStart(d.offsetNode,d.offset)),e},EPUBJS.Renderer.prototype.pagesInCurrentChapter=function(){var a,b;return this.pageMap?(b=this.pageMap.length,a=this.spreads?Math.ceil(b/2):b):(console.warn("page map not loaded"),!1)},EPUBJS.Renderer.prototype.currentRenderedPage=function(){var a;return this.pageMap?a=this.spreads&&this.layout.pageCount>1?2*this.chapterPos:this.chapterPos:(console.warn("page map not loaded"),!1)},EPUBJS.Renderer.prototype.getRenderedPagesLeft=function(){var a,b,c;return this.pageMap?(b=this.pageMap.length,a=this.spreads?2*this.chapterPos:this.chapterPos,c=b-a):(console.warn("page map not loaded"),!1)},EPUBJS.Renderer.prototype.getVisibleRangeCfi=function(){var a,b,c;return this.pageMap?(this.spreads?(a=2*this.chapterPos,b=this.pageMap[a-2],c=b,this.layout.pageCount>1&&(c=this.pageMap[a-1])):(a=this.chapterPos,b=this.pageMap[a-1],c=b),b||(console.warn("page range miss:",a,this.pageMap),b=this.pageMap[this.pageMap.length-1],c=b),{start:b.start,end:c.end}):(console.warn("page map not loaded"),!1)},EPUBJS.Renderer.prototype.gotoCfi=function(a){var b,c,d;return this._moving?this._q.enqueue("gotoCfi",arguments):(_.isString(a)&&(a=this.epubcfi.parse(a)),void("undefined"==typeof document.evaluate?(c=this.epubcfi.addMarker(a,this.doc),c&&(b=this.render.getPageNumberByElement(c),this.epubcfi.removeMarker(c,this.doc),this.page(b))):(d=this.epubcfi.generateRangeFromCfi(a,this.doc),d&&(b=this.render.getPageNumberByRect(d.getBoundingClientRect()),this.page(b)))))},EPUBJS.Renderer.prototype.findFirstVisible=function(a){var b,c=a||this.render.getBaseElement();return b=this.walk(c),b?b:a},EPUBJS.Renderer.prototype.findElementAfter=function(a,b,c){var d,e=c||this.render.getBaseElement();return d=this.walk(e,a,b),d?d:e},EPUBJS.Renderer.prototype.resize=function(a,b,c){this.width=a,this.height=b,c!==!1&&this.render.resize(this.width,this.height),this.contents&&this.reformat(),this.trigger("renderer:resized",{width:this.width,height:this.height})},EPUBJS.Renderer.prototype.onResized=function(){var a=this.container.clientWidth,b=this.container.clientHeight;this.resize(a,b,!1)},EPUBJS.Renderer.prototype.addEventListeners=function(){this.render.document&&this.listenedEvents.forEach(function(a){this.render.document.addEventListener(a,this.triggerEvent.bind(this),!1)},this)},EPUBJS.Renderer.prototype.removeEventListeners=function(){this.render.document&&this.listenedEvents.forEach(function(a){this.render.document.removeEventListener(a,this.triggerEvent,!1)},this)},EPUBJS.Renderer.prototype.triggerEvent=function(a){this.trigger("renderer:"+a.type,a)},EPUBJS.Renderer.prototype.addSelectionListeners=function(){this.render.document.addEventListener("selectionchange",this.onSelectionChange.bind(this),!1)},EPUBJS.Renderer.prototype.removeSelectionListeners=function(){this.render.document&&this.doc.removeEventListener("selectionchange",this.onSelectionChange,!1)},EPUBJS.Renderer.prototype.onSelectionChange=function(){this.selectionEndTimeout&&clearTimeout(this.selectionEndTimeout),this.selectionEndTimeout=setTimeout(function(){this.selectedRange=this.render.window.getSelection(),this.trigger("renderer:selected",this.selectedRange)}.bind(this),500)},EPUBJS.Renderer.prototype.setMinSpreadWidth=function(a){this.minSpreadWidth=a,this.spreads=this.determineSpreads(a)},EPUBJS.Renderer.prototype.determineSpreads=function(a){return this.isForcedSingle||!a||this.width<a?!1:!0},EPUBJS.Renderer.prototype.forceSingle=function(a){this.isForcedSingle=a?!0:!1},EPUBJS.Renderer.prototype.setGap=function(a){this.gap=a},EPUBJS.Renderer.prototype.replace=function(a,b,c,d){var e=this.contents.querySelectorAll(a),f=Array.prototype.slice.call(e),g=f.length;return 0===g?void c(!1):void f.forEach(function(a){var e=!1,f=function(a,b){e===!1&&(g--,d&&d(a,b,g),0>=g&&c&&c(!0),e=!0)};b(a,f)}.bind(this))},EPUBJS.Renderer.prototype.replaceWithStored=function(a,b,c,d){var e,f={},g=this.currentChapter.store,h=this.caches[a],i=EPUBJS.core.uri(this.currentChapter.absolute),j=i.base,k=b,l=2e3,m=function(a,b){f[b]=a},n=function(){d&&d(),_.each(e,function(a){g.revokeUrl(a)}),h=f};g&&(h||(h={}),e=_.clone(h),this.replace(a,function(b,d){var h=b.getAttribute(k),i=EPUBJS.core.resolveUrl(j,h),m=function(c){var e;b.onload=function(){clearTimeout(e),d(c,i)},b.onerror=function(a){clearTimeout(e),d(c,i),console.error(a)},"image"==a&&b.setAttribute("externalResourcesRequired","true"),"link[href]"==a&&"stylesheet"!==b.getAttribute("rel")&&d(c,i),b.setAttribute(k,c),e=setTimeout(function(){d(c,i)},l)};i in e?(m(e[i]),f[i]=e[i],delete e[i]):c(g,i,m,b)},n,m))},RSVP.EventTarget.mixin(EPUBJS.Renderer.prototype);var EPUBJS=EPUBJS||{};EPUBJS.replace={},EPUBJS.replace.hrefs=function(a,b){var c=this,d=function(a,d){var e,f,g=a.getAttribute("href"),h=g.search("://");-1!=h?a.setAttribute("target","_blank"):(e=EPUBJS.core.uri(b.render.window.location.href).directory,f=EPUBJS.core.resolveUrl(e,g),a.onclick=function(){return c.goto(f),!1}),d()};b.replace("a[href]",d,a)},EPUBJS.replace.head=function(a,b){b.replaceWithStored("link[href]","href",EPUBJS.replace.links,a)},EPUBJS.replace.resources=function(a,b){b.replaceWithStored("[src]","src",EPUBJS.replace.srcs,a)},EPUBJS.replace.svg=function(a,b){b.replaceWithStored("image","xlink:href",function(a,b,c){a.getUrl(b).then(c)},a)},EPUBJS.replace.srcs=function(a,b,c){a.getUrl(b).then(c)},EPUBJS.replace.links=function(a,b,c,d){"stylesheet"===d.getAttribute("rel")?EPUBJS.replace.stylesheets(a,b).then(function(a,b){setTimeout(function(){c(a,b)},5)}):a.getUrl(b).then(c)},EPUBJS.replace.stylesheets=function(a,b){var c=new RSVP.defer;if(a)return a.getText(b).then(function(d){EPUBJS.replace.cssUrls(a,b,d).then(function(a){var b=window.URL||window.webkitURL||window.mozURL,d=new Blob([a],{type:"text/css"}),e=b.createObjectURL(d);c.resolve(e)},function(a){console.error(a)})}),c.promise},EPUBJS.replace.cssUrls=function(a,b,c){var d=new RSVP.defer,e=[],f=c.match(/url\(\'?\"?([^\'|^\"^\)]*)\'?\"?\)/g);if(a)return f?(f.forEach(function(d){var f=EPUBJS.core.resolveUrl(b,d.replace(/url\(|[|\)|\'|\"]/g,"")),g=a.getUrl(f).then(function(a){c=c.replace(d,'url("'+a+'")')});e.push(g)}),RSVP.all(e).then(function(){d.resolve(c)}),d.promise):(d.resolve(c),d.promise)},EPUBJS.Unarchiver=function(a){return this.libPath=EPUBJS.filePath,this.zipUrl=a,this.loadLib(),this.urlCache={},this.zipFs=new zip.fs.FS,this.promise},EPUBJS.Unarchiver.prototype.loadLib=function(){"undefined"==typeof zip&&console.error("Zip lib not loaded"),zip.workerScriptsPath=this.libPath},EPUBJS.Unarchiver.prototype.openZip=function(a){var b=new RSVP.defer,c=this.zipFs;return c.importHttpContent(a,!1,function(){b.resolve(c)},this.failed),b.promise},EPUBJS.Unarchiver.prototype.getXml=function(a,b){return this.getText(a,b).then(function(a){var b=new DOMParser;return b.parseFromString(a,"application/xml")})},EPUBJS.Unarchiver.prototype.getUrl=function(a,b){var c=this,d=new RSVP.defer,e=window.decodeURIComponent(a),f=this.zipFs.find(e),g=window.URL||window.webkitURL||window.mozURL;return f?a in this.urlCache?(d.resolve(this.urlCache[a]),d.promise):(f.getBlob(b||zip.getMimeType(f.name),function(b){var e=g.createObjectURL(b);d.resolve(e),c.urlCache[a]=e}),d.promise):(d.reject({message:"File not found in the epub: "+a,stack:(new Error).stack}),d.promise)},EPUBJS.Unarchiver.prototype.getText=function(a,b){{var c=new RSVP.defer,d=window.decodeURIComponent(a),e=this.zipFs.find(d);window.URL||window.webkitURL||window.mozURL}return e?(e.getText(function(a){c.resolve(a)},null,null,b||"UTF-8"),c.promise):(console.warn("File not found in the contained epub:",a),c.promise)},EPUBJS.Unarchiver.prototype.revokeUrl=function(a){var b=window.URL||window.webkitURL||window.mozURL,c=unarchiver.urlCache[a];c&&b.revokeObjectURL(c)},EPUBJS.Unarchiver.prototype.failed=function(a){console.error(a)},EPUBJS.Unarchiver.prototype.afterSaved=function(){this.callback()},EPUBJS.Unarchiver.prototype.toStorage=function(a){function b(){f--,0===f&&e.afterSaved()}var c=0,d=20,e=this,f=a.length;a.forEach(function(a){setTimeout(function(a){e.saveEntryFileToStorage(a,b)},c,a),c+=d}),console.log("time",c)},EPUBJS.Unarchiver.prototype.saveEntryFileToStorage=function(a,b){a.getData(new zip.BlobWriter,function(c){EPUBJS.storage.save(a.filename,c,b)})};
//# sourceMappingURL=epub.min.map
;
/*
Copyright (c) 2013 Gildas Lormeau. All rights reserved.
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
1. Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in
the documentation and/or other materials provided with the distribution.
3. The names of the authors may not be used to endorse or promote products
derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*
* This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
* JZlib is based on zlib-1.1.3, so all credit should go authors
* Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
* and contributors of zlib.
*/

(function(obj) {
// Global
var MAX_BITS = 15;
var D_CODES = 30;
var BL_CODES = 19;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = (LITERALS + 1 + LENGTH_CODES);
var HEAP_SIZE = (2 * L_CODES + 1);
var END_BLOCK = 256;
// Bit length codes must not exceed MAX_BL_BITS bits
var MAX_BL_BITS = 7;
// repeat previous bit length 3-6 times (2 bits of repeat count)
var REP_3_6 = 16;
// repeat a zero length 3-10 times (3 bits of repeat count)
var REPZ_3_10 = 17;
// repeat a zero length 11-138 times (7 bits of repeat count)
var REPZ_11_138 = 18;
// The lengths of the bit length codes are sent in order of decreasing
// probability, to avoid transmitting the lengths for unused bit
// length codes.
var Buf_size = 8 * 2;
// JZlib version : "1.0.2"
var Z_DEFAULT_COMPRESSION = -1;
// compression strategy
var Z_FILTERED = 1;
var Z_HUFFMAN_ONLY = 2;
var Z_DEFAULT_STRATEGY = 0;
var Z_NO_FLUSH = 0;
var Z_PARTIAL_FLUSH = 1;
var Z_FULL_FLUSH = 3;
var Z_FINISH = 4;
var Z_OK = 0;
var Z_STREAM_END = 1;
var Z_NEED_DICT = 2;
var Z_STREAM_ERROR = -2;
var Z_DATA_ERROR = -3;
var Z_BUF_ERROR = -5;
// Tree
// see definition of array dist_code below
var _dist_code = [ 0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12,
12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19,
20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
27, 27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29,
29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29 ];
function Tree() {
var that = this;
// dyn_tree; // the dynamic tree
// max_code; // largest code with non zero frequency
// stat_desc; // the corresponding static tree
// Compute the optimal bit lengths for a tree and update the total bit
// length
// for the current block.
// IN assertion: the fields freq and dad are set, heap[heap_max] and
// above are the tree nodes sorted by increasing frequency.
// OUT assertions: the field len is set to the optimal bit length, the
// array bl_count contains the frequencies for each bit length.
// The length opt_len is updated; static_len is also updated if stree is
// not null.
function gen_bitlen(s) {
var tree = that.dyn_tree;
var stree = that.stat_desc.static_tree;
var extra = that.stat_desc.extra_bits;
var base = that.stat_desc.extra_base;
var max_length = that.stat_desc.max_length;
var h; // heap index
var n, m; // iterate over the tree elements
var bits; // bit length
var xbits; // extra bits
var f; // frequency
var overflow = 0; // number of elements with bit length too large
for (bits = 0; bits <= MAX_BITS; bits++)
s.bl_count[bits] = 0;
// In a first pass, compute the optimal bit lengths (which may
// overflow in the case of the bit length tree).
tree[s.heap[s.heap_max] * 2 + 1] = 0; // root of the heap
for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
n = s.heap[h];
bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
if (bits > max_length) {
bits = max_length;
overflow++;
}
tree[n * 2 + 1] = bits;
// We overwrite tree[n*2+1] which is no longer needed
if (n > that.max_code)
continue; // not a leaf node
s.bl_count[bits]++;
xbits = 0;
if (n >= base)
xbits = extra[n - base];
f = tree[n * 2];
s.opt_len += f * (bits + xbits);
if (stree)
s.static_len += f * (stree[n * 2 + 1] + xbits);
}
if (overflow === 0)
return;
// This happens for example on obj2 and pic of the Calgary corpus
// Find the first bit length which could increase:
do {
bits = max_length - 1;
while (s.bl_count[bits] === 0)
bits--;
s.bl_count[bits]--; // move one leaf down the tree
s.bl_count[bits + 1] += 2; // move one overflow item as its brother
s.bl_count[max_length]--;
// The brother of the overflow item also moves one step up,
// but this does not affect bl_count[max_length]
overflow -= 2;
} while (overflow > 0);
for (bits = max_length; bits !== 0; bits--) {
n = s.bl_count[bits];
while (n !== 0) {
m = s.heap[--h];
if (m > that.max_code)
continue;
if (tree[m * 2 + 1] != bits) {
s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
tree[m * 2 + 1] = bits;
}
n--;
}
}
}
// Reverse the first len bits of a code, using straightforward code (a
// faster
// method would use a table)
// IN assertion: 1 <= len <= 15
function bi_reverse(code, // the value to invert
len // its bit length
) {
var res = 0;
do {
res |= code & 1;
code >>>= 1;
res <<= 1;
} while (--len > 0);
return res >>> 1;
}
// Generate the codes for a given tree and bit counts (which need not be
// optimal).
// IN assertion: the array bl_count contains the bit length statistics for
// the given tree and the field len is set for all tree elements.
// OUT assertion: the field code is set for all tree elements of non
// zero code length.
function gen_codes(tree, // the tree to decorate
max_code, // largest code with non zero frequency
bl_count // number of codes at each bit length
) {
var next_code = []; // next code value for each
// bit length
var code = 0; // running code value
var bits; // bit index
var n; // code index
var len;
// The distribution counts are first used to generate the code values
// without bit reversal.
for (bits = 1; bits <= MAX_BITS; bits++) {
next_code[bits] = code = ((code + bl_count[bits - 1]) << 1);
}
// Check that the bit counts in bl_count are consistent. The last code
// must be all ones.
// Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
// "inconsistent bit counts");
// Tracev((stderr,"\ngen_codes: max_code %d ", max_code));
for (n = 0; n <= max_code; n++) {
len = tree[n * 2 + 1];
if (len === 0)
continue;
// Now reverse the bits
tree[n * 2] = bi_reverse(next_code[len]++, len);
}
}
// Construct one Huffman tree and assigns the code bit strings and lengths.
// Update the total bit length for the current block.
// IN assertion: the field freq is set for all tree elements.
// OUT assertions: the fields len and code are set to the optimal bit length
// and corresponding code. The length opt_len is updated; static_len is
// also updated if stree is not null. The field max_code is set.
that.build_tree = function(s) {
var tree = that.dyn_tree;
var stree = that.stat_desc.static_tree;
var elems = that.stat_desc.elems;
var n, m; // iterate over heap elements
var max_code = -1; // largest code with non zero frequency
var node; // new node being created
// Construct the initial heap, with least frequent element in
// heap[1]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
// heap[0] is not used.
s.heap_len = 0;
s.heap_max = HEAP_SIZE;
for (n = 0; n < elems; n++) {
if (tree[n * 2] !== 0) {
s.heap[++s.heap_len] = max_code = n;
s.depth[n] = 0;
} else {
tree[n * 2 + 1] = 0;
}
}
// The pkzip format requires that at least one distance code exists,
// and that at least one bit should be sent even if there is only one
// possible code. So to avoid special checks later on we force at least
// two codes of non zero frequency.
while (s.heap_len < 2) {
node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
tree[node * 2] = 1;
s.depth[node] = 0;
s.opt_len--;
if (stree)
s.static_len -= stree[node * 2 + 1];
// node is 0 or 1 so it does not have extra bits
}
that.max_code = max_code;
// The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
// establish sub-heaps of increasing lengths:
for (n = Math.floor(s.heap_len / 2); n >= 1; n--)
s.pqdownheap(tree, n);
// Construct the Huffman tree by repeatedly combining the least two
// frequent nodes.
node = elems; // next internal node of the tree
do {
// n = node of least frequency
n = s.heap[1];
s.heap[1] = s.heap[s.heap_len--];
s.pqdownheap(tree, 1);
m = s.heap[1]; // m = node of next least frequency
s.heap[--s.heap_max] = n; // keep the nodes sorted by frequency
s.heap[--s.heap_max] = m;
// Create a new node father of n and m
tree[node * 2] = (tree[n * 2] + tree[m * 2]);
s.depth[node] = Math.max(s.depth[n], s.depth[m]) + 1;
tree[n * 2 + 1] = tree[m * 2 + 1] = node;
// and insert the new node in the heap
s.heap[1] = node++;
s.pqdownheap(tree, 1);
} while (s.heap_len >= 2);
s.heap[--s.heap_max] = s.heap[1];
// At this point, the fields freq and dad are set. We can now
// generate the bit lengths.
gen_bitlen(s);
// The field len is now set, we can generate the bit codes
gen_codes(tree, that.max_code, s.bl_count);
};
}
Tree._length_code = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16,
16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20,
20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25,
25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26,
26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28 ];
Tree.base_length = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0 ];
Tree.base_dist = [ 0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384,
24576 ];
// Mapping from a distance to a distance code. dist is the distance - 1 and
// must not have side effects. _dist_code[256] and _dist_code[257] are never
// used.
Tree.d_code = function(dist) {
return ((dist) < 256 ? _dist_code[dist] : _dist_code[256 + ((dist) >>> 7)]);
};
// extra bits for each length code
Tree.extra_lbits = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0 ];
// extra bits for each distance code
Tree.extra_dbits = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ];
// extra bits for each bit length code
Tree.extra_blbits = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7 ];
Tree.bl_order = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];
// StaticTree
function StaticTree(static_tree, extra_bits, extra_base, elems, max_length) {
var that = this;
that.static_tree = static_tree;
that.extra_bits = extra_bits;
that.extra_base = extra_base;
that.elems = elems;
that.max_length = max_length;
}
StaticTree.static_ltree = [ 12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8,
130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42,
8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8,
22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8, 118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8,
222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113,
8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8,
69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8, 141, 8, 77, 8, 205, 8, 45, 8,
173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9,
51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9,
427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379,
9, 251, 9, 507, 9, 7, 9, 263, 9, 135, 9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23,
9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9,
399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9,
223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7, 16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7,
40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8,
99, 8, 227, 8 ];
StaticTree.static_dtree = [ 0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5,
25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5 ];
StaticTree.static_l_desc = new StaticTree(StaticTree.static_ltree, Tree.extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
StaticTree.static_d_desc = new StaticTree(StaticTree.static_dtree, Tree.extra_dbits, 0, D_CODES, MAX_BITS);
StaticTree.static_bl_desc = new StaticTree(null, Tree.extra_blbits, 0, BL_CODES, MAX_BL_BITS);
// Deflate
var MAX_MEM_LEVEL = 9;
var DEF_MEM_LEVEL = 8;
function Config(good_length, max_lazy, nice_length, max_chain, func) {
var that = this;
that.good_length = good_length;
that.max_lazy = max_lazy;
that.nice_length = nice_length;
that.max_chain = max_chain;
that.func = func;
}
var STORED = 0;
var FAST = 1;
var SLOW = 2;
var config_table = [ new Config(0, 0, 0, 0, STORED), new Config(4, 4, 8, 4, FAST), new Config(4, 5, 16, 8, FAST), new Config(4, 6, 32, 32, FAST),
new Config(4, 4, 16, 16, SLOW), new Config(8, 16, 32, 32, SLOW), new Config(8, 16, 128, 128, SLOW), new Config(8, 32, 128, 256, SLOW),
new Config(32, 128, 258, 1024, SLOW), new Config(32, 258, 258, 4096, SLOW) ];
var z_errmsg = [ "need dictionary", // Z_NEED_DICT
// 2
"stream end", // Z_STREAM_END 1
"", // Z_OK 0
"", // Z_ERRNO (-1)
"stream error", // Z_STREAM_ERROR (-2)
"data error", // Z_DATA_ERROR (-3)
"", // Z_MEM_ERROR (-4)
"buffer error", // Z_BUF_ERROR (-5)
"",// Z_VERSION_ERROR (-6)
"" ];
// block not completed, need more input or more output
var NeedMore = 0;
// block flush performed
var BlockDone = 1;
// finish started, need only more output at next deflate
var FinishStarted = 2;
// finish done, accept no more input or output
var FinishDone = 3;
// preset dictionary flag in zlib header
var PRESET_DICT = 0x20;
var INIT_STATE = 42;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
// The deflate compression method
var Z_DEFLATED = 8;
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);
function smaller(tree, n, m, depth) {
var tn2 = tree[n * 2];
var tm2 = tree[m * 2];
return (tn2 < tm2 || (tn2 == tm2 && depth[n] <= depth[m]));
}
function Deflate() {
var that = this;
var strm; // pointer back to this zlib stream
var status; // as the name implies
// pending_buf; // output still pending
var pending_buf_size; // size of pending_buf
// pending_out; // next pending byte to output to the stream
// pending; // nb of bytes in the pending buffer
var method; // STORED (for zip only) or DEFLATED
var last_flush; // value of flush param for previous deflate call
var w_size; // LZ77 window size (32K by default)
var w_bits; // log2(w_size) (8..16)
var w_mask; // w_size - 1
var window;
// Sliding window. Input bytes are read into the second half of the window,
// and move to the first half later to keep a dictionary of at least wSize
// bytes. With this organization, matches are limited to a distance of
// wSize-MAX_MATCH bytes, but this ensures that IO is always
// performed with a length multiple of the block size. Also, it limits
// the window size to 64K, which is quite useful on MSDOS.
// To do: use the user input buffer as sliding window.
var window_size;
// Actual size of window: 2*wSize, except when the user input buffer
// is directly used as sliding window.
var prev;
// Link to older string with same hash index. To limit the size of this
// array to 64K, this link is maintained only for the last 32K strings.
// An index in this array is thus a window index modulo 32K.
var head; // Heads of the hash chains or NIL.
var ins_h; // hash index of string to be inserted
var hash_size; // number of elements in hash table
var hash_bits; // log2(hash_size)
var hash_mask; // hash_size-1
// Number of bits by which ins_h must be shifted at each input
// step. It must be such that after MIN_MATCH steps, the oldest
// byte no longer takes part in the hash key, that is:
// hash_shift * MIN_MATCH >= hash_bits
var hash_shift;
// Window position at the beginning of the current output block. Gets
// negative when the window is moved backwards.
var block_start;
var match_length; // length of best match
var prev_match; // previous match
var match_available; // set if previous match exists
var strstart; // start of string to insert
var match_start; // start of matching string
var lookahead; // number of valid bytes ahead in window
// Length of the best match at previous step. Matches not greater than this
// are discarded. This is used in the lazy match evaluation.
var prev_length;
// To speed up deflation, hash chains are never searched beyond this
// length. A higher limit improves compression ratio but degrades the speed.
var max_chain_length;
// Attempt to find a better match only when the current match is strictly
// smaller than this value. This mechanism is used only for compression
// levels >= 4.
var max_lazy_match;
// Insert new strings in the hash table only if the match length is not
// greater than this length. This saves time but degrades compression.
// max_insert_length is used only for compression levels <= 3.
var level; // compression level (1..9)
var strategy; // favor or force Huffman coding
// Use a faster search when the previous match is longer than this
var good_match;
// Stop searching when current match exceeds this
var nice_match;
var dyn_ltree; // literal and length tree
var dyn_dtree; // distance tree
var bl_tree; // Huffman tree for bit lengths
var l_desc = new Tree(); // desc for literal tree
var d_desc = new Tree(); // desc for distance tree
var bl_desc = new Tree(); // desc for bit length tree
// that.heap_len; // number of elements in the heap
// that.heap_max; // element of largest frequency
// The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
// The same heap array is used to build all trees.
// Depth of each subtree used as tie breaker for trees of equal frequency
that.depth = [];
var l_buf; // index for literals or lengths */
// Size of match buffer for literals/lengths. There are 4 reasons for
// limiting lit_bufsize to 64K:
// - frequencies can be kept in 16 bit counters
// - if compression is not successful for the first block, all input
// data is still in the window so we can still emit a stored block even
// when input comes from standard input. (This can also be done for
// all blocks if lit_bufsize is not greater than 32K.)
// - if compression is not successful for a file smaller than 64K, we can
// even emit a stored file instead of a stored block (saving 5 bytes).
// This is applicable only for zip (not gzip or zlib).
// - creating new Huffman trees less frequently may not provide fast
// adaptation to changes in the input data statistics. (Take for
// example a binary file with poorly compressible code followed by
// a highly compressible string table.) Smaller buffer sizes give
// fast adaptation but have of course the overhead of transmitting
// trees more frequently.
// - I can't count above 4
var lit_bufsize;
var last_lit; // running index in l_buf
// Buffer for distances. To simplify the code, d_buf and l_buf have
// the same number of elements. To use different lengths, an extra flag
// array would be necessary.
var d_buf; // index of pendig_buf
// that.opt_len; // bit length of current block with optimal trees
// that.static_len; // bit length of current block with static trees
var matches; // number of string matches in current block
var last_eob_len; // bit length of EOB code for last block
// Output buffer. bits are inserted starting at the bottom (least
// significant bits).
var bi_buf;
// Number of valid bits in bi_buf. All bits above the last valid bit
// are always zero.
var bi_valid;
// number of codes at each bit length for an optimal tree
that.bl_count = [];
// heap used to build the Huffman trees
that.heap = [];
dyn_ltree = [];
dyn_dtree = [];
bl_tree = [];
function lm_init() {
var i;
window_size = 2 * w_size;
head[hash_size - 1] = 0;
for (i = 0; i < hash_size - 1; i++) {
head[i] = 0;
}
// Set the default configuration parameters:
max_lazy_match = config_table[level].max_lazy;
good_match = config_table[level].good_length;
nice_match = config_table[level].nice_length;
max_chain_length = config_table[level].max_chain;
strstart = 0;
block_start = 0;
lookahead = 0;
match_length = prev_length = MIN_MATCH - 1;
match_available = 0;
ins_h = 0;
}
function init_block() {
var i;
// Initialize the trees.
for (i = 0; i < L_CODES; i++)
dyn_ltree[i * 2] = 0;
for (i = 0; i < D_CODES; i++)
dyn_dtree[i * 2] = 0;
for (i = 0; i < BL_CODES; i++)
bl_tree[i * 2] = 0;
dyn_ltree[END_BLOCK * 2] = 1;
that.opt_len = that.static_len = 0;
last_lit = matches = 0;
}
// Initialize the tree data structures for a new zlib stream.
function tr_init() {
l_desc.dyn_tree = dyn_ltree;
l_desc.stat_desc = StaticTree.static_l_desc;
d_desc.dyn_tree = dyn_dtree;
d_desc.stat_desc = StaticTree.static_d_desc;
bl_desc.dyn_tree = bl_tree;
bl_desc.stat_desc = StaticTree.static_bl_desc;
bi_buf = 0;
bi_valid = 0;
last_eob_len = 8; // enough lookahead for inflate
// Initialize the first block of the first file:
init_block();
}
// Restore the heap property by moving down the tree starting at node k,
// exchanging a node with the smallest of its two sons if necessary,
// stopping
// when the heap property is re-established (each father smaller than its
// two sons).
that.pqdownheap = function(tree, // the tree to restore
k // node to move down
) {
var heap = that.heap;
var v = heap[k];
var j = k << 1; // left son of k
while (j <= that.heap_len) {
// Set j to the smallest of the two sons:
if (j < that.heap_len && smaller(tree, heap[j + 1], heap[j], that.depth)) {
j++;
}
// Exit if v is smaller than both sons
if (smaller(tree, v, heap[j], that.depth))
break;
// Exchange v with the smallest son
heap[k] = heap[j];
k = j;
// And continue down the tree, setting j to the left son of k
j <<= 1;
}
heap[k] = v;
};
// Scan a literal or distance tree to determine the frequencies of the codes
// in the bit length tree.
function scan_tree(tree,// the tree to be scanned
max_code // and its largest code of non zero frequency
) {
var n; // iterates over all tree elements
var prevlen = -1; // last emitted length
var curlen; // length of current code
var nextlen = tree[0 * 2 + 1]; // length of next code
var count = 0; // repeat count of the current code
var max_count = 7; // max repeat count
var min_count = 4; // min repeat count
if (nextlen === 0) {
max_count = 138;
min_count = 3;
}
tree[(max_code + 1) * 2 + 1] = 0xffff; // guard
for (n = 0; n <= max_code; n++) {
curlen = nextlen;
nextlen = tree[(n + 1) * 2 + 1];
if (++count < max_count && curlen == nextlen) {
continue;
} else if (count < min_count) {
bl_tree[curlen * 2] += count;
} else if (curlen !== 0) {
if (curlen != prevlen)
bl_tree[curlen * 2]++;
bl_tree[REP_3_6 * 2]++;
} else if (count <= 10) {
bl_tree[REPZ_3_10 * 2]++;
} else {
bl_tree[REPZ_11_138 * 2]++;
}
count = 0;
prevlen = curlen;
if (nextlen === 0) {
max_count = 138;
min_count = 3;
} else if (curlen == nextlen) {
max_count = 6;
min_count = 3;
} else {
max_count = 7;
min_count = 4;
}
}
}
// Construct the Huffman tree for the bit lengths and return the index in
// bl_order of the last bit length code to send.
function build_bl_tree() {
var max_blindex; // index of last bit length code of non zero freq
// Determine the bit length frequencies for literal and distance trees
scan_tree(dyn_ltree, l_desc.max_code);
scan_tree(dyn_dtree, d_desc.max_code);
// Build the bit length tree:
bl_desc.build_tree(that);
// opt_len now includes the length of the tree representations, except
// the lengths of the bit lengths codes and the 5+5+4 bits for the
// counts.
// Determine the number of bit length codes to send. The pkzip format
// requires that at least 4 bit length codes be sent. (appnote.txt says
// 3 but the actual value used is 4.)
for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
if (bl_tree[Tree.bl_order[max_blindex] * 2 + 1] !== 0)
break;
}
// Update opt_len to include the bit length tree and counts
that.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
return max_blindex;
}
// Output a byte on the stream.
// IN assertion: there is enough room in pending_buf.
function put_byte(p) {
that.pending_buf[that.pending++] = p;
}
function put_short(w) {
put_byte(w & 0xff);
put_byte((w >>> 8) & 0xff);
}
function putShortMSB(b) {
put_byte((b >> 8) & 0xff);
put_byte((b & 0xff) & 0xff);
}
function send_bits(value, length) {
var val, len = length;
if (bi_valid > Buf_size - len) {
val = value;
// bi_buf |= (val << bi_valid);
bi_buf |= ((val << bi_valid) & 0xffff);
put_short(bi_buf);
bi_buf = val >>> (Buf_size - bi_valid);
bi_valid += len - Buf_size;
} else {
// bi_buf |= (value) << bi_valid;
bi_buf |= (((value) << bi_valid) & 0xffff);
bi_valid += len;
}
}
function send_code(c, tree) {
var c2 = c * 2;
send_bits(tree[c2] & 0xffff, tree[c2 + 1] & 0xffff);
}
// Send a literal or distance tree in compressed form, using the codes in
// bl_tree.
function send_tree(tree,// the tree to be sent
max_code // and its largest code of non zero frequency
) {
var n; // iterates over all tree elements
var prevlen = -1; // last emitted length
var curlen; // length of current code
var nextlen = tree[0 * 2 + 1]; // length of next code
var count = 0; // repeat count of the current code
var max_count = 7; // max repeat count
var min_count = 4; // min repeat count
if (nextlen === 0) {
max_count = 138;
min_count = 3;
}
for (n = 0; n <= max_code; n++) {
curlen = nextlen;
nextlen = tree[(n + 1) * 2 + 1];
if (++count < max_count && curlen == nextlen) {
continue;
} else if (count < min_count) {
do {
send_code(curlen, bl_tree);
} while (--count !== 0);
} else if (curlen !== 0) {
if (curlen != prevlen) {
send_code(curlen, bl_tree);
count--;
}
send_code(REP_3_6, bl_tree);
send_bits(count - 3, 2);
} else if (count <= 10) {
send_code(REPZ_3_10, bl_tree);
send_bits(count - 3, 3);
} else {
send_code(REPZ_11_138, bl_tree);
send_bits(count - 11, 7);
}
count = 0;
prevlen = curlen;
if (nextlen === 0) {
max_count = 138;
min_count = 3;
} else if (curlen == nextlen) {
max_count = 6;
min_count = 3;
} else {
max_count = 7;
min_count = 4;
}
}
}
// Send the header for a block using dynamic Huffman trees: the counts, the
// lengths of the bit length codes, the literal tree and the distance tree.
// IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
function send_all_trees(lcodes, dcodes, blcodes) {
var rank; // index in bl_order
send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt
send_bits(dcodes - 1, 5);
send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt
for (rank = 0; rank < blcodes; rank++) {
send_bits(bl_tree[Tree.bl_order[rank] * 2 + 1], 3);
}
send_tree(dyn_ltree, lcodes - 1); // literal tree
send_tree(dyn_dtree, dcodes - 1); // distance tree
}
// Flush the bit buffer, keeping at most 7 bits in it.
function bi_flush() {
if (bi_valid == 16) {
put_short(bi_buf);
bi_buf = 0;
bi_valid = 0;
} else if (bi_valid >= 8) {
put_byte(bi_buf & 0xff);
bi_buf >>>= 8;
bi_valid -= 8;
}
}
// Send one empty static block to give enough lookahead for inflate.
// This takes 10 bits, of which 7 may remain in the bit buffer.
// The current inflate code requires 9 bits of lookahead. If the
// last two codes for the previous block (real code plus EOB) were coded
// on 5 bits or less, inflate may have only 5+3 bits of lookahead to decode
// the last real code. In this case we send two empty static blocks instead
// of one. (There are no problems if the previous block is stored or fixed.)
// To simplify the code, we assume the worst case of last real code encoded
// on one bit only.
function _tr_align() {
send_bits(STATIC_TREES << 1, 3);
send_code(END_BLOCK, StaticTree.static_ltree);
bi_flush();
// Of the 10 bits for the empty block, we have already sent
// (10 - bi_valid) bits. The lookahead for the last real code (before
// the EOB of the previous block) was thus at least one plus the length
// of the EOB plus what we have just sent of the empty static block.
if (1 + last_eob_len + 10 - bi_valid < 9) {
send_bits(STATIC_TREES << 1, 3);
send_code(END_BLOCK, StaticTree.static_ltree);
bi_flush();
}
last_eob_len = 7;
}
// Save the match info and tally the frequency counts. Return true if
// the current block must be flushed.
function _tr_tally(dist, // distance of matched string
lc // match length-MIN_MATCH or unmatched char (if dist==0)
) {
var out_length, in_length, dcode;
that.pending_buf[d_buf + last_lit * 2] = (dist >>> 8) & 0xff;
that.pending_buf[d_buf + last_lit * 2 + 1] = dist & 0xff;
that.pending_buf[l_buf + last_lit] = lc & 0xff;
last_lit++;
if (dist === 0) {
// lc is the unmatched char
dyn_ltree[lc * 2]++;
} else {
matches++;
// Here, lc is the match length - MIN_MATCH
dist--; // dist = match distance - 1
dyn_ltree[(Tree._length_code[lc] + LITERALS + 1) * 2]++;
dyn_dtree[Tree.d_code(dist) * 2]++;
}
if ((last_lit & 0x1fff) === 0 && level > 2) {
// Compute an upper bound for the compressed length
out_length = last_lit * 8;
in_length = strstart - block_start;
for (dcode = 0; dcode < D_CODES; dcode++) {
out_length += dyn_dtree[dcode * 2] * (5 + Tree.extra_dbits[dcode]);
}
out_length >>>= 3;
if ((matches < Math.floor(last_lit / 2)) && out_length < Math.floor(in_length / 2))
return true;
}
return (last_lit == lit_bufsize - 1);
// We avoid equality with lit_bufsize because of wraparound at 64K
// on 16 bit machines and because stored blocks are restricted to
// 64K-1 bytes.
}
// Send the block data compressed using the given Huffman trees
function compress_block(ltree, dtree) {
var dist; // distance of matched string
var lc; // match length or unmatched char (if dist === 0)
var lx = 0; // running index in l_buf
var code; // the code to send
var extra; // number of extra bits to send
if (last_lit !== 0) {
do {
dist = ((that.pending_buf[d_buf + lx * 2] << 8) & 0xff00) | (that.pending_buf[d_buf + lx * 2 + 1] & 0xff);
lc = (that.pending_buf[l_buf + lx]) & 0xff;
lx++;
if (dist === 0) {
send_code(lc, ltree); // send a literal byte
} else {
// Here, lc is the match length - MIN_MATCH
code = Tree._length_code[lc];
send_code(code + LITERALS + 1, ltree); // send the length
// code
extra = Tree.extra_lbits[code];
if (extra !== 0) {
lc -= Tree.base_length[code];
send_bits(lc, extra); // send the extra length bits
}
dist--; // dist is now the match distance - 1
code = Tree.d_code(dist);
send_code(code, dtree); // send the distance code
extra = Tree.extra_dbits[code];
if (extra !== 0) {
dist -= Tree.base_dist[code];
send_bits(dist, extra); // send the extra distance bits
}
} // literal or match pair ?
// Check that the overlay between pending_buf and d_buf+l_buf is
// ok:
} while (lx < last_lit);
}
send_code(END_BLOCK, ltree);
last_eob_len = ltree[END_BLOCK * 2 + 1];
}
// Flush the bit buffer and align the output on a byte boundary
function bi_windup() {
if (bi_valid > 8) {
put_short(bi_buf);
} else if (bi_valid > 0) {
put_byte(bi_buf & 0xff);
}
bi_buf = 0;
bi_valid = 0;
}
// Copy a stored block, storing first the length and its
// one's complement if requested.
function copy_block(buf, // the input data
len, // its length
header // true if block header must be written
) {
bi_windup(); // align on byte boundary
last_eob_len = 8; // enough lookahead for inflate
if (header) {
put_short(len);
put_short(~len);
}
that.pending_buf.set(window.subarray(buf, buf + len), that.pending);
that.pending += len;
}
// Send a stored block
function _tr_stored_block(buf, // input block
stored_len, // length of input block
eof // true if this is the last block for a file
) {
send_bits((STORED_BLOCK << 1) + (eof ? 1 : 0), 3); // send block type
copy_block(buf, stored_len, true); // with header
}
// Determine the best encoding for the current block: dynamic trees, static
// trees or store, and output the encoded block to the zip file.
function _tr_flush_block(buf, // input block, or NULL if too old
stored_len, // length of input block
eof // true if this is the last block for a file
) {
var opt_lenb, static_lenb;// opt_len and static_len in bytes
var max_blindex = 0; // index of last bit length code of non zero freq
// Build the Huffman trees unless a stored block is forced
if (level > 0) {
// Construct the literal and distance trees
l_desc.build_tree(that);
d_desc.build_tree(that);
// At this point, opt_len and static_len are the total bit lengths
// of
// the compressed block data, excluding the tree representations.
// Build the bit length tree for the above two trees, and get the
// index
// in bl_order of the last bit length code to send.
max_blindex = build_bl_tree();
// Determine the best encoding. Compute first the block length in
// bytes
opt_lenb = (that.opt_len + 3 + 7) >>> 3;
static_lenb = (that.static_len + 3 + 7) >>> 3;
if (static_lenb <= opt_lenb)
opt_lenb = static_lenb;
} else {
opt_lenb = static_lenb = stored_len + 5; // force a stored block
}
if ((stored_len + 4 <= opt_lenb) && buf != -1) {
// 4: two words for the lengths
// The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
// Otherwise we can't have processed more than WSIZE input bytes
// since
// the last block flush, because compression would have been
// successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
// transform a block into a stored block.
_tr_stored_block(buf, stored_len, eof);
} else if (static_lenb == opt_lenb) {
send_bits((STATIC_TREES << 1) + (eof ? 1 : 0), 3);
compress_block(StaticTree.static_ltree, StaticTree.static_dtree);
} else {
send_bits((DYN_TREES << 1) + (eof ? 1 : 0), 3);
send_all_trees(l_desc.max_code + 1, d_desc.max_code + 1, max_blindex + 1);
compress_block(dyn_ltree, dyn_dtree);
}
// The above check is made mod 2^32, for files larger than 512 MB
// and uLong implemented on 32 bits.
init_block();
if (eof) {
bi_windup();
}
}
function flush_block_only(eof) {
_tr_flush_block(block_start >= 0 ? block_start : -1, strstart - block_start, eof);
block_start = strstart;
strm.flush_pending();
}
// Fill the window when the lookahead becomes insufficient.
// Updates strstart and lookahead.
//
// IN assertion: lookahead < MIN_LOOKAHEAD
// OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
// At least one byte has been read, or avail_in === 0; reads are
// performed for at least two bytes (required for the zip translate_eol
// option -- not supported here).
function fill_window() {
var n, m;
var p;
var more; // Amount of free space at the end of the window.
do {
more = (window_size - lookahead - strstart);
// Deal with !@#$% 64K limit:
if (more === 0 && strstart === 0 && lookahead === 0) {
more = w_size;
} else if (more == -1) {
// Very unlikely, but possible on 16 bit machine if strstart ==
// 0
// and lookahead == 1 (input done one byte at time)
more--;
// If the window is almost full and there is insufficient
// lookahead,
// move the upper half to the lower one to make room in the
// upper half.
} else if (strstart >= w_size + w_size - MIN_LOOKAHEAD) {
window.set(window.subarray(w_size, w_size + w_size), 0);
match_start -= w_size;
strstart -= w_size; // we now have strstart >= MAX_DIST
block_start -= w_size;
// Slide the hash table (could be avoided with 32 bit values
// at the expense of memory usage). We slide even when level ==
// 0
// to keep the hash table consistent if we switch back to level
// > 0
// later. (Using level 0 permanently is not an optimal usage of
// zlib, so we don't care about this pathological case.)
n = hash_size;
p = n;
do {
m = (head[--p] & 0xffff);
head[p] = (m >= w_size ? m - w_size : 0);
} while (--n !== 0);
n = w_size;
p = n;
do {
m = (prev[--p] & 0xffff);
prev[p] = (m >= w_size ? m - w_size : 0);
// If n is not on any hash chain, prev[n] is garbage but
// its value will never be used.
} while (--n !== 0);
more += w_size;
}
if (strm.avail_in === 0)
return;
// If there was no sliding:
// strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
// more == window_size - lookahead - strstart
// => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
// => more >= window_size - 2*WSIZE + 2
// In the BIG_MEM or MMAP case (not yet supported),
// window_size == input_size + MIN_LOOKAHEAD &&
// strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
// Otherwise, window_size == 2*WSIZE so more >= 2.
// If there was sliding, more >= WSIZE. So in all cases, more >= 2.
n = strm.read_buf(window, strstart + lookahead, more);
lookahead += n;
// Initialize the hash value now that we have some input:
if (lookahead >= MIN_MATCH) {
ins_h = window[strstart] & 0xff;
ins_h = (((ins_h) << hash_shift) ^ (window[strstart + 1] & 0xff)) & hash_mask;
}
// If the whole input has less than MIN_MATCH bytes, ins_h is
// garbage,
// but this is not important since only literal bytes will be
// emitted.
} while (lookahead < MIN_LOOKAHEAD && strm.avail_in !== 0);
}
// Copy without compression as much as possible from the input stream,
// return
// the current block state.
// This function does not insert new strings in the dictionary since
// uncompressible data is probably not useful. This function is used
// only for the level=0 compression option.
// NOTE: this function should be optimized to avoid extra copying from
// window to pending_buf.
function deflate_stored(flush) {
// Stored blocks are limited to 0xffff bytes, pending_buf is limited
// to pending_buf_size, and each stored block has a 5 byte header:
var max_block_size = 0xffff;
var max_start;
if (max_block_size > pending_buf_size - 5) {
max_block_size = pending_buf_size - 5;
}
// Copy as much as possible from input to output:
while (true) {
// Fill the window as much as possible:
if (lookahead <= 1) {
fill_window();
if (lookahead === 0 && flush == Z_NO_FLUSH)
return NeedMore;
if (lookahead === 0)
break; // flush the current block
}
strstart += lookahead;
lookahead = 0;
// Emit a stored block if pending_buf will be full:
max_start = block_start + max_block_size;
if (strstart === 0 || strstart >= max_start) {
// strstart === 0 is possible when wraparound on 16-bit machine
lookahead = (strstart - max_start);
strstart = max_start;
flush_block_only(false);
if (strm.avail_out === 0)
return NeedMore;
}
// Flush if we may have to slide, otherwise block_start may become
// negative and the data will be gone:
if (strstart - block_start >= w_size - MIN_LOOKAHEAD) {
flush_block_only(false);
if (strm.avail_out === 0)
return NeedMore;
}
}
flush_block_only(flush == Z_FINISH);
if (strm.avail_out === 0)
return (flush == Z_FINISH) ? FinishStarted : NeedMore;
return flush == Z_FINISH ? FinishDone : BlockDone;
}
function longest_match(cur_match) {
var chain_length = max_chain_length; // max hash chain length
var scan = strstart; // current string
var match; // matched string
var len; // length of current match
var best_len = prev_length; // best match length so far
var limit = strstart > (w_size - MIN_LOOKAHEAD) ? strstart - (w_size - MIN_LOOKAHEAD) : 0;
var _nice_match = nice_match;
// Stop when cur_match becomes <= limit. To simplify the code,
// we prevent matches with the string of window index 0.
var wmask = w_mask;
var strend = strstart + MAX_MATCH;
var scan_end1 = window[scan + best_len - 1];
var scan_end = window[scan + best_len];
// The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of
// 16.
// It is easy to get rid of this optimization if necessary.
// Do not waste too much time if we already have a good match:
if (prev_length >= good_match) {
chain_length >>= 2;
}
// Do not look for matches beyond the end of the input. This is
// necessary
// to make deflate deterministic.
if (_nice_match > lookahead)
_nice_match = lookahead;
do {
match = cur_match;
// Skip to next match if the match length cannot increase
// or if the match length is less than 2:
if (window[match + best_len] != scan_end || window[match + best_len - 1] != scan_end1 || window[match] != window[scan]
|| window[++match] != window[scan + 1])
continue;
// The check at best_len-1 can be removed because it will be made
// again later. (This heuristic is not always a win.)
// It is not necessary to compare scan[2] and match[2] since they
// are always equal when the other bytes match, given that
// the hash keys are equal and that HASH_BITS >= 8.
scan += 2;
match++;
// We check for insufficient lookahead only every 8th comparison;
// the 256th check will be made at strstart+258.
do {
} while (window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match]
&& window[++scan] == window[++match] && window[++scan] == window[++match] && window[++scan] == window[++match]
&& window[++scan] == window[++match] && window[++scan] == window[++match] && scan < strend);
len = MAX_MATCH - (strend - scan);
scan = strend - MAX_MATCH;
if (len > best_len) {
match_start = cur_match;
best_len = len;
if (len >= _nice_match)
break;
scan_end1 = window[scan + best_len - 1];
scan_end = window[scan + best_len];
}
} while ((cur_match = (prev[cur_match & wmask] & 0xffff)) > limit && --chain_length !== 0);
if (best_len <= lookahead)
return best_len;
return lookahead;
}
// Compress as much as possible from the input stream, return the current
// block state.
// This function does not perform lazy evaluation of matches and inserts
// new strings in the dictionary only for unmatched strings or for short
// matches. It is used only for the fast compression options.
function deflate_fast(flush) {
// short hash_head = 0; // head of the hash chain
var hash_head = 0; // head of the hash chain
var bflush; // set if current block must be flushed
while (true) {
// Make sure that we always have enough lookahead, except
// at the end of the input file. We need MAX_MATCH bytes
// for the next match, plus MIN_MATCH bytes to insert the
// string following the next match.
if (lookahead < MIN_LOOKAHEAD) {
fill_window();
if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
return NeedMore;
}
if (lookahead === 0)
break; // flush the current block
}
// Insert the string window[strstart .. strstart+2] in the
// dictionary, and set hash_head to the head of the hash chain:
if (lookahead >= MIN_MATCH) {
ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
// prev[strstart&w_mask]=hash_head=head[ins_h];
hash_head = (head[ins_h] & 0xffff);
prev[strstart & w_mask] = head[ins_h];
head[ins_h] = strstart;
}
// Find the longest match, discarding those <= prev_length.
// At this point we have always match_length < MIN_MATCH
if (hash_head !== 0 && ((strstart - hash_head) & 0xffff) <= w_size - MIN_LOOKAHEAD) {
// To simplify the code, we prevent matches with the string
// of window index 0 (in particular we have to avoid a match
// of the string with itself at the start of the input file).
if (strategy != Z_HUFFMAN_ONLY) {
match_length = longest_match(hash_head);
}
// longest_match() sets match_start
}
if (match_length >= MIN_MATCH) {
// check_match(strstart, match_start, match_length);
bflush = _tr_tally(strstart - match_start, match_length - MIN_MATCH);
lookahead -= match_length;
// Insert new strings in the hash table only if the match length
// is not too large. This saves time but degrades compression.
if (match_length <= max_lazy_match && lookahead >= MIN_MATCH) {
match_length--; // string at strstart already in hash table
do {
strstart++;
ins_h = ((ins_h << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
// prev[strstart&w_mask]=hash_head=head[ins_h];
hash_head = (head[ins_h] & 0xffff);
prev[strstart & w_mask] = head[ins_h];
head[ins_h] = strstart;
// strstart never exceeds WSIZE-MAX_MATCH, so there are
// always MIN_MATCH bytes ahead.
} while (--match_length !== 0);
strstart++;
} else {
strstart += match_length;
match_length = 0;
ins_h = window[strstart] & 0xff;
ins_h = (((ins_h) << hash_shift) ^ (window[strstart + 1] & 0xff)) & hash_mask;
// If lookahead < MIN_MATCH, ins_h is garbage, but it does
// not
// matter since it will be recomputed at next deflate call.
}
} else {
// No match, output a literal byte
bflush = _tr_tally(0, window[strstart] & 0xff);
lookahead--;
strstart++;
}
if (bflush) {
flush_block_only(false);
if (strm.avail_out === 0)
return NeedMore;
}
}
flush_block_only(flush == Z_FINISH);
if (strm.avail_out === 0) {
if (flush == Z_FINISH)
return FinishStarted;
else
return NeedMore;
}
return flush == Z_FINISH ? FinishDone : BlockDone;
}
// Same as above, but achieves better compression. We use a lazy
// evaluation for matches: a match is finally adopted only if there is
// no better match at the next window position.
function deflate_slow(flush) {
// short hash_head = 0; // head of hash chain
var hash_head = 0; // head of hash chain
var bflush; // set if current block must be flushed
var max_insert;
// Process the input block.
while (true) {
// Make sure that we always have enough lookahead, except
// at the end of the input file. We need MAX_MATCH bytes
// for the next match, plus MIN_MATCH bytes to insert the
// string following the next match.
if (lookahead < MIN_LOOKAHEAD) {
fill_window();
if (lookahead < MIN_LOOKAHEAD && flush == Z_NO_FLUSH) {
return NeedMore;
}
if (lookahead === 0)
break; // flush the current block
}
// Insert the string window[strstart .. strstart+2] in the
// dictionary, and set hash_head to the head of the hash chain:
if (lookahead >= MIN_MATCH) {
ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
// prev[strstart&w_mask]=hash_head=head[ins_h];
hash_head = (head[ins_h] & 0xffff);
prev[strstart & w_mask] = head[ins_h];
head[ins_h] = strstart;
}
// Find the longest match, discarding those <= prev_length.
prev_length = match_length;
prev_match = match_start;
match_length = MIN_MATCH - 1;
if (hash_head !== 0 && prev_length < max_lazy_match && ((strstart - hash_head) & 0xffff) <= w_size - MIN_LOOKAHEAD) {
// To simplify the code, we prevent matches with the string
// of window index 0 (in particular we have to avoid a match
// of the string with itself at the start of the input file).
if (strategy != Z_HUFFMAN_ONLY) {
match_length = longest_match(hash_head);
}
// longest_match() sets match_start
if (match_length <= 5 && (strategy == Z_FILTERED || (match_length == MIN_MATCH && strstart - match_start > 4096))) {
// If prev_match is also MIN_MATCH, match_start is garbage
// but we will ignore the current match anyway.
match_length = MIN_MATCH - 1;
}
}
// If there was a match at the previous step and the current
// match is not better, output the previous match:
if (prev_length >= MIN_MATCH && match_length <= prev_length) {
max_insert = strstart + lookahead - MIN_MATCH;
// Do not insert strings in hash table beyond this.
// check_match(strstart-1, prev_match, prev_length);
bflush = _tr_tally(strstart - 1 - prev_match, prev_length - MIN_MATCH);
// Insert in hash table all strings up to the end of the match.
// strstart-1 and strstart are already inserted. If there is not
// enough lookahead, the last two strings are not inserted in
// the hash table.
lookahead -= prev_length - 1;
prev_length -= 2;
do {
if (++strstart <= max_insert) {
ins_h = (((ins_h) << hash_shift) ^ (window[(strstart) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
// prev[strstart&w_mask]=hash_head=head[ins_h];
hash_head = (head[ins_h] & 0xffff);
prev[strstart & w_mask] = head[ins_h];
head[ins_h] = strstart;
}
} while (--prev_length !== 0);
match_available = 0;
match_length = MIN_MATCH - 1;
strstart++;
if (bflush) {
flush_block_only(false);
if (strm.avail_out === 0)
return NeedMore;
}
} else if (match_available !== 0) {
// If there was no match at the previous position, output a
// single literal. If there was a match but the current match
// is longer, truncate the previous match to a single literal.
bflush = _tr_tally(0, window[strstart - 1] & 0xff);
if (bflush) {
flush_block_only(false);
}
strstart++;
lookahead--;
if (strm.avail_out === 0)
return NeedMore;
} else {
// There is no previous match to compare with, wait for
// the next step to decide.
match_available = 1;
strstart++;
lookahead--;
}
}
if (match_available !== 0) {
bflush = _tr_tally(0, window[strstart - 1] & 0xff);
match_available = 0;
}
flush_block_only(flush == Z_FINISH);
if (strm.avail_out === 0) {
if (flush == Z_FINISH)
return FinishStarted;
else
return NeedMore;
}
return flush == Z_FINISH ? FinishDone : BlockDone;
}
function deflateReset(strm) {
strm.total_in = strm.total_out = 0;
strm.msg = null; //
that.pending = 0;
that.pending_out = 0;
status = BUSY_STATE;
last_flush = Z_NO_FLUSH;
tr_init();
lm_init();
return Z_OK;
}
that.deflateInit = function(strm, _level, bits, _method, memLevel, _strategy) {
if (!_method)
_method = Z_DEFLATED;
if (!memLevel)
memLevel = DEF_MEM_LEVEL;
if (!_strategy)
_strategy = Z_DEFAULT_STRATEGY;
// byte[] my_version=ZLIB_VERSION;
//
// if (!version || version[0] != my_version[0]
// || stream_size != sizeof(z_stream)) {
// return Z_VERSION_ERROR;
// }
strm.msg = null;
if (_level == Z_DEFAULT_COMPRESSION)
_level = 6;
if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || _method != Z_DEFLATED || bits < 9 || bits > 15 || _level < 0 || _level > 9 || _strategy < 0
|| _strategy > Z_HUFFMAN_ONLY) {
return Z_STREAM_ERROR;
}
strm.dstate = that;
w_bits = bits;
w_size = 1 << w_bits;
w_mask = w_size - 1;
hash_bits = memLevel + 7;
hash_size = 1 << hash_bits;
hash_mask = hash_size - 1;
hash_shift = Math.floor((hash_bits + MIN_MATCH - 1) / MIN_MATCH);
window = new Uint8Array(w_size * 2);
prev = [];
head = [];
lit_bufsize = 1 << (memLevel + 6); // 16K elements by default
// We overlay pending_buf and d_buf+l_buf. This works since the average
// output size for (length,distance) codes is <= 24 bits.
that.pending_buf = new Uint8Array(lit_bufsize * 4);
pending_buf_size = lit_bufsize * 4;
d_buf = Math.floor(lit_bufsize / 2);
l_buf = (1 + 2) * lit_bufsize;
level = _level;
strategy = _strategy;
method = _method & 0xff;
return deflateReset(strm);
};
that.deflateEnd = function() {
if (status != INIT_STATE && status != BUSY_STATE && status != FINISH_STATE) {
return Z_STREAM_ERROR;
}
// Deallocate in reverse order of allocations:
that.pending_buf = null;
head = null;
prev = null;
window = null;
// free
that.dstate = null;
return status == BUSY_STATE ? Z_DATA_ERROR : Z_OK;
};
that.deflateParams = function(strm, _level, _strategy) {
var err = Z_OK;
if (_level == Z_DEFAULT_COMPRESSION) {
_level = 6;
}
if (_level < 0 || _level > 9 || _strategy < 0 || _strategy > Z_HUFFMAN_ONLY) {
return Z_STREAM_ERROR;
}
if (config_table[level].func != config_table[_level].func && strm.total_in !== 0) {
// Flush the last buffer:
err = strm.deflate(Z_PARTIAL_FLUSH);
}
if (level != _level) {
level = _level;
max_lazy_match = config_table[level].max_lazy;
good_match = config_table[level].good_length;
nice_match = config_table[level].nice_length;
max_chain_length = config_table[level].max_chain;
}
strategy = _strategy;
return err;
};
that.deflateSetDictionary = function(strm, dictionary, dictLength) {
var length = dictLength;
var n, index = 0;
if (!dictionary || status != INIT_STATE)
return Z_STREAM_ERROR;
if (length < MIN_MATCH)
return Z_OK;
if (length > w_size - MIN_LOOKAHEAD) {
length = w_size - MIN_LOOKAHEAD;
index = dictLength - length; // use the tail of the dictionary
}
window.set(dictionary.subarray(index, index + length), 0);
strstart = length;
block_start = length;
// Insert all strings in the hash table (except for the last two bytes).
// s->lookahead stays null, so s->ins_h will be recomputed at the next
// call of fill_window.
ins_h = window[0] & 0xff;
ins_h = (((ins_h) << hash_shift) ^ (window[1] & 0xff)) & hash_mask;
for (n = 0; n <= length - MIN_MATCH; n++) {
ins_h = (((ins_h) << hash_shift) ^ (window[(n) + (MIN_MATCH - 1)] & 0xff)) & hash_mask;
prev[n & w_mask] = head[ins_h];
head[ins_h] = n;
}
return Z_OK;
};
that.deflate = function(_strm, flush) {
var i, header, level_flags, old_flush, bstate;
if (flush > Z_FINISH || flush < 0) {
return Z_STREAM_ERROR;
}
if (!_strm.next_out || (!_strm.next_in && _strm.avail_in !== 0) || (status == FINISH_STATE && flush != Z_FINISH)) {
_strm.msg = z_errmsg[Z_NEED_DICT - (Z_STREAM_ERROR)];
return Z_STREAM_ERROR;
}
if (_strm.avail_out === 0) {
_strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
return Z_BUF_ERROR;
}
strm = _strm; // just in case
old_flush = last_flush;
last_flush = flush;
// Write the zlib header
if (status == INIT_STATE) {
header = (Z_DEFLATED + ((w_bits - 8) << 4)) << 8;
level_flags = ((level - 1) & 0xff) >> 1;
if (level_flags > 3)
level_flags = 3;
header |= (level_flags << 6);
if (strstart !== 0)
header |= PRESET_DICT;
header += 31 - (header % 31);
status = BUSY_STATE;
putShortMSB(header);
}
// Flush as much pending output as possible
if (that.pending !== 0) {
strm.flush_pending();
if (strm.avail_out === 0) {
// console.log(" avail_out==0");
// Since avail_out is 0, deflate will be called again with
// more output space, but possibly with both pending and
// avail_in equal to zero. There won't be anything to do,
// but this is not an error situation so make sure we
// return OK instead of BUF_ERROR at next call of deflate:
last_flush = -1;
return Z_OK;
}
// Make sure there is something to do and avoid duplicate
// consecutive
// flushes. For repeated and useless calls with Z_FINISH, we keep
// returning Z_STREAM_END instead of Z_BUFF_ERROR.
} else if (strm.avail_in === 0 && flush <= old_flush && flush != Z_FINISH) {
strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
return Z_BUF_ERROR;
}
// User must not provide more input after the first FINISH:
if (status == FINISH_STATE && strm.avail_in !== 0) {
_strm.msg = z_errmsg[Z_NEED_DICT - (Z_BUF_ERROR)];
return Z_BUF_ERROR;
}
// Start a new block or continue the current one.
if (strm.avail_in !== 0 || lookahead !== 0 || (flush != Z_NO_FLUSH && status != FINISH_STATE)) {
bstate = -1;
switch (config_table[level].func) {
case STORED:
bstate = deflate_stored(flush);
break;
case FAST:
bstate = deflate_fast(flush);
break;
case SLOW:
bstate = deflate_slow(flush);
break;
default:
}
if (bstate == FinishStarted || bstate == FinishDone) {
status = FINISH_STATE;
}
if (bstate == NeedMore || bstate == FinishStarted) {
if (strm.avail_out === 0) {
last_flush = -1; // avoid BUF_ERROR next call, see above
}
return Z_OK;
// If flush != Z_NO_FLUSH && avail_out === 0, the next call
// of deflate should use the same flush parameter to make sure
// that the flush is complete. So we don't have to output an
// empty block here, this will be done at next call. This also
// ensures that for a very small output buffer, we emit at most
// one empty block.
}
if (bstate == BlockDone) {
if (flush == Z_PARTIAL_FLUSH) {
_tr_align();
} else { // FULL_FLUSH or SYNC_FLUSH
_tr_stored_block(0, 0, false);
// For a full flush, this empty block will be recognized
// as a special marker by inflate_sync().
if (flush == Z_FULL_FLUSH) {
// state.head[s.hash_size-1]=0;
for (i = 0; i < hash_size/*-1*/; i++)
// forget history
head[i] = 0;
}
}
strm.flush_pending();
if (strm.avail_out === 0) {
last_flush = -1; // avoid BUF_ERROR at next call, see above
return Z_OK;
}
}
}
if (flush != Z_FINISH)
return Z_OK;
return Z_STREAM_END;
};
}
// ZStream
function ZStream() {
var that = this;
that.next_in_index = 0;
that.next_out_index = 0;
// that.next_in; // next input byte
that.avail_in = 0; // number of bytes available at next_in
that.total_in = 0; // total nb of input bytes read so far
// that.next_out; // next output byte should be put there
that.avail_out = 0; // remaining free space at next_out
that.total_out = 0; // total nb of bytes output so far
// that.msg;
// that.dstate;
}
ZStream.prototype = {
deflateInit : function(level, bits) {
var that = this;
that.dstate = new Deflate();
if (!bits)
bits = MAX_BITS;
return that.dstate.deflateInit(that, level, bits);
},
deflate : function(flush) {
var that = this;
if (!that.dstate) {
return Z_STREAM_ERROR;
}
return that.dstate.deflate(that, flush);
},
deflateEnd : function() {
var that = this;
if (!that.dstate)
return Z_STREAM_ERROR;
var ret = that.dstate.deflateEnd();
that.dstate = null;
return ret;
},
deflateParams : function(level, strategy) {
var that = this;
if (!that.dstate)
return Z_STREAM_ERROR;
return that.dstate.deflateParams(that, level, strategy);
},
deflateSetDictionary : function(dictionary, dictLength) {
var that = this;
if (!that.dstate)
return Z_STREAM_ERROR;
return that.dstate.deflateSetDictionary(that, dictionary, dictLength);
},
// Read a new buffer from the current input stream, update the
// total number of bytes read. All deflate() input goes through
// this function so some applications may wish to modify it to avoid
// allocating a large strm->next_in buffer and copying from it.
// (See also flush_pending()).
read_buf : function(buf, start, size) {
var that = this;
var len = that.avail_in;
if (len > size)
len = size;
if (len === 0)
return 0;
that.avail_in -= len;
buf.set(that.next_in.subarray(that.next_in_index, that.next_in_index + len), start);
that.next_in_index += len;
that.total_in += len;
return len;
},
// Flush as much pending output as possible. All deflate() output goes
// through this function so some applications may wish to modify it
// to avoid allocating a large strm->next_out buffer and copying into it.
// (See also read_buf()).
flush_pending : function() {
var that = this;
var len = that.dstate.pending;
if (len > that.avail_out)
len = that.avail_out;
if (len === 0)
return;
// if (that.dstate.pending_buf.length <= that.dstate.pending_out || that.next_out.length <= that.next_out_index
// || that.dstate.pending_buf.length < (that.dstate.pending_out + len) || that.next_out.length < (that.next_out_index +
// len)) {
// console.log(that.dstate.pending_buf.length + ", " + that.dstate.pending_out + ", " + that.next_out.length + ", " +
// that.next_out_index + ", " + len);
// console.log("avail_out=" + that.avail_out);
// }
that.next_out.set(that.dstate.pending_buf.subarray(that.dstate.pending_out, that.dstate.pending_out + len), that.next_out_index);
that.next_out_index += len;
that.dstate.pending_out += len;
that.total_out += len;
that.avail_out -= len;
that.dstate.pending -= len;
if (that.dstate.pending === 0) {
that.dstate.pending_out = 0;
}
}
};
// Deflater
function Deflater(level) {
var that = this;
var z = new ZStream();
var bufsize = 512;
var flush = Z_NO_FLUSH;
var buf = new Uint8Array(bufsize);
if (typeof level == "undefined")
level = Z_DEFAULT_COMPRESSION;
z.deflateInit(level);
z.next_out = buf;
that.append = function(data, onprogress) {
var err, buffers = [], lastIndex = 0, bufferIndex = 0, bufferSize = 0, array;
if (!data.length)
return;
z.next_in_index = 0;
z.next_in = data;
z.avail_in = data.length;
do {
z.next_out_index = 0;
z.avail_out = bufsize;
err = z.deflate(flush);
if (err != Z_OK)
throw "deflating: " + z.msg;
if (z.next_out_index)
if (z.next_out_index == bufsize)
buffers.push(new Uint8Array(buf));
else
buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
bufferSize += z.next_out_index;
if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
onprogress(z.next_in_index);
lastIndex = z.next_in_index;
}
} while (z.avail_in > 0 || z.avail_out === 0);
array = new Uint8Array(bufferSize);
buffers.forEach(function(chunk) {
array.set(chunk, bufferIndex);
bufferIndex += chunk.length;
});
return array;
};
that.flush = function() {
var err, buffers = [], bufferIndex = 0, bufferSize = 0, array;
do {
z.next_out_index = 0;
z.avail_out = bufsize;
err = z.deflate(Z_FINISH);
if (err != Z_STREAM_END && err != Z_OK)
throw "deflating: " + z.msg;
if (bufsize - z.avail_out > 0)
buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
bufferSize += z.next_out_index;
} while (z.avail_in > 0 || z.avail_out === 0);
z.deflateEnd();
array = new Uint8Array(bufferSize);
buffers.forEach(function(chunk) {
array.set(chunk, bufferIndex);
bufferIndex += chunk.length;
});
return array;
};
}
var deflater;
if (obj.zip)
obj.zip.Deflater = Deflater;
else {
deflater = new Deflater();
obj.addEventListener("message", function(event) {
var message = event.data;
if (message.init) {
deflater = new Deflater(message.level);
obj.postMessage({
oninit : true
});
}
if (message.append)
obj.postMessage({
onappend : true,
data : deflater.append(message.data, function(current) {
obj.postMessage({
progress : true,
current : current
});
})
});
if (message.flush)
obj.postMessage({
onflush : true,
data : deflater.flush()
});
}, false);
}
})(this);
(function(){var a=this,b=a._,c={},d=Array.prototype,e=Object.prototype,f=Function.prototype,g=d.push,h=d.slice,i=d.concat,j=e.toString,k=e.hasOwnProperty,l=d.forEach,m=d.map,n=d.reduce,o=d.reduceRight,p=d.filter,q=d.every,r=d.some,s=d.indexOf,t=d.lastIndexOf,u=Array.isArray,v=Object.keys,w=f.bind,x=function(a){return a instanceof x?a:this instanceof x?void(this._wrapped=a):new x(a)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=x),exports._=x):a._=x,x.VERSION="1.4.4";var y=x.each=x.forEach=function(a,b,d){if(null!=a)if(l&&a.forEach===l)a.forEach(b,d);else if(a.length===+a.length){for(var e=0,f=a.length;f>e;e++)if(b.call(d,a[e],e,a)===c)return}else for(var g in a)if(x.has(a,g)&&b.call(d,a[g],g,a)===c)return};x.map=x.collect=function(a,b,c){var d=[];return null==a?d:m&&a.map===m?a.map(b,c):(y(a,function(a,e,f){d[d.length]=b.call(c,a,e,f)}),d)};var z="Reduce of empty array with no initial value";x.reduce=x.foldl=x.inject=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),n&&a.reduce===n)return d&&(b=x.bind(b,d)),e?a.reduce(b,c):a.reduce(b);if(y(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)}),!e)throw new TypeError(z);return c},x.reduceRight=x.foldr=function(a,b,c,d){var e=arguments.length>2;if(null==a&&(a=[]),o&&a.reduceRight===o)return d&&(b=x.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);var f=a.length;if(f!==+f){var g=x.keys(a);f=g.length}if(y(a,function(h,i,j){i=g?g[--f]:--f,e?c=b.call(d,c,a[i],i,j):(c=a[i],e=!0)}),!e)throw new TypeError(z);return c},x.find=x.detect=function(a,b,c){var d;return A(a,function(a,e,f){return b.call(c,a,e,f)?(d=a,!0):void 0}),d},x.filter=x.select=function(a,b,c){var d=[];return null==a?d:p&&a.filter===p?a.filter(b,c):(y(a,function(a,e,f){b.call(c,a,e,f)&&(d[d.length]=a)}),d)},x.reject=function(a,b,c){return x.filter(a,function(a,d,e){return!b.call(c,a,d,e)},c)},x.every=x.all=function(a,b,d){b||(b=x.identity);var e=!0;return null==a?e:q&&a.every===q?a.every(b,d):(y(a,function(a,f,g){return(e=e&&b.call(d,a,f,g))?void 0:c}),!!e)};var A=x.some=x.any=function(a,b,d){b||(b=x.identity);var e=!1;return null==a?e:r&&a.some===r?a.some(b,d):(y(a,function(a,f,g){return e||(e=b.call(d,a,f,g))?c:void 0}),!!e)};x.contains=x.include=function(a,b){return null==a?!1:s&&a.indexOf===s?-1!=a.indexOf(b):A(a,function(a){return a===b})},x.invoke=function(a,b){var c=h.call(arguments,2),d=x.isFunction(b);return x.map(a,function(a){return(d?b:a[b]).apply(a,c)})},x.pluck=function(a,b){return x.map(a,function(a){return a[b]})},x.where=function(a,b,c){return x.isEmpty(b)?c?null:[]:x[c?"find":"filter"](a,function(a){for(var c in b)if(b[c]!==a[c])return!1;return!0})},x.findWhere=function(a,b){return x.where(a,b,!0)},x.max=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&65535>a.length)return Math.max.apply(Math,a);if(!b&&x.isEmpty(a))return-1/0;var d={computed:-1/0,value:-1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;g>=d.computed&&(d={value:a,computed:g})}),d.value},x.min=function(a,b,c){if(!b&&x.isArray(a)&&a[0]===+a[0]&&65535>a.length)return Math.min.apply(Math,a);if(!b&&x.isEmpty(a))return 1/0;var d={computed:1/0,value:1/0};return y(a,function(a,e,f){var g=b?b.call(c,a,e,f):a;d.computed>g&&(d={value:a,computed:g})}),d.value},x.shuffle=function(a){var b,c=0,d=[];return y(a,function(a){b=x.random(c++),d[c-1]=d[b],d[b]=a}),d};var B=function(a){return x.isFunction(a)?a:function(b){return b[a]}};x.sortBy=function(a,b,c){var d=B(b);return x.pluck(x.map(a,function(a,b,e){return{value:a,index:b,criteria:d.call(c,a,b,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;if(c!==d){if(c>d||void 0===c)return 1;if(d>c||void 0===d)return-1}return a.index<b.index?-1:1}),"value")};var C=function(a,b,c,d){var e={},f=B(b||x.identity);return y(a,function(b,g){var h=f.call(c,b,g,a);d(e,h,b)}),e};x.groupBy=function(a,b,c){return C(a,b,c,function(a,b,c){(x.has(a,b)?a[b]:a[b]=[]).push(c)})},x.countBy=function(a,b,c){return C(a,b,c,function(a,b){x.has(a,b)||(a[b]=0),a[b]++})},x.sortedIndex=function(a,b,c,d){c=null==c?x.identity:B(c);for(var e=c.call(d,b),f=0,g=a.length;g>f;){var h=f+g>>>1;e>c.call(d,a[h])?f=h+1:g=h}return f},x.toArray=function(a){return a?x.isArray(a)?h.call(a):a.length===+a.length?x.map(a,x.identity):x.values(a):[]},x.size=function(a){return null==a?0:a.length===+a.length?a.length:x.keys(a).length},x.first=x.head=x.take=function(a,b,c){return null==a?void 0:null==b||c?a[0]:h.call(a,0,b)},x.initial=function(a,b,c){return h.call(a,0,a.length-(null==b||c?1:b))},x.last=function(a,b,c){return null==a?void 0:null==b||c?a[a.length-1]:h.call(a,Math.max(a.length-b,0))},x.rest=x.tail=x.drop=function(a,b,c){return h.call(a,null==b||c?1:b)},x.compact=function(a){return x.filter(a,x.identity)};var D=function(a,b,c){return y(a,function(a){x.isArray(a)?b?g.apply(c,a):D(a,b,c):c.push(a)}),c};x.flatten=function(a,b){return D(a,b,[])},x.without=function(a){return x.difference(a,h.call(arguments,1))},x.uniq=x.unique=function(a,b,c,d){x.isFunction(b)&&(d=c,c=b,b=!1);var e=c?x.map(a,c,d):a,f=[],g=[];return y(e,function(c,d){(b?d&&g[g.length-1]===c:x.contains(g,c))||(g.push(c),f.push(a[d]))}),f},x.union=function(){return x.uniq(i.apply(d,arguments))},x.intersection=function(a){var b=h.call(arguments,1);return x.filter(x.uniq(a),function(a){return x.every(b,function(b){return x.indexOf(b,a)>=0})})},x.difference=function(a){var b=i.apply(d,h.call(arguments,1));return x.filter(a,function(a){return!x.contains(b,a)})},x.zip=function(){for(var a=h.call(arguments),b=x.max(x.pluck(a,"length")),c=Array(b),d=0;b>d;d++)c[d]=x.pluck(a,""+d);return c},x.object=function(a,b){if(null==a)return{};for(var c={},d=0,e=a.length;e>d;d++)b?c[a[d]]=b[d]:c[a[d][0]]=a[d][1];return c},x.indexOf=function(a,b,c){if(null==a)return-1;var d=0,e=a.length;if(c){if("number"!=typeof c)return d=x.sortedIndex(a,b),a[d]===b?d:-1;d=0>c?Math.max(0,e+c):c}if(s&&a.indexOf===s)return a.indexOf(b,c);for(;e>d;d++)if(a[d]===b)return d;return-1},x.lastIndexOf=function(a,b,c){if(null==a)return-1;var d=null!=c;if(t&&a.lastIndexOf===t)return d?a.lastIndexOf(b,c):a.lastIndexOf(b);for(var e=d?c:a.length;e--;)if(a[e]===b)return e;return-1},x.range=function(a,b,c){1>=arguments.length&&(b=a||0,a=0),c=arguments[2]||1;for(var d=Math.max(Math.ceil((b-a)/c),0),e=0,f=Array(d);d>e;)f[e++]=a,a+=c;return f},x.bind=function(a,b){if(a.bind===w&&w)return w.apply(a,h.call(arguments,1));var c=h.call(arguments,2);return function(){return a.apply(b,c.concat(h.call(arguments)))}},x.partial=function(a){var b=h.call(arguments,1);return function(){return a.apply(this,b.concat(h.call(arguments)))}},x.bindAll=function(a){var b=h.call(arguments,1);return 0===b.length&&(b=x.functions(a)),y(b,function(b){a[b]=x.bind(a[b],a)}),a},x.memoize=function(a,b){var c={};return b||(b=x.identity),function(){var d=b.apply(this,arguments);return x.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},x.delay=function(a,b){var c=h.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},x.defer=function(a){return x.delay.apply(x,[a,1].concat(h.call(arguments,1)))},x.throttle=function(a,b){var c,d,e,f,g=0,h=function(){g=new Date,e=null,f=a.apply(c,d)};return function(){var i=new Date,j=b-(i-g);return c=this,d=arguments,0>=j?(clearTimeout(e),e=null,g=i,f=a.apply(c,d)):e||(e=setTimeout(h,j)),f}},x.debounce=function(a,b,c){var d,e;return function(){var f=this,g=arguments,h=function(){d=null,c||(e=a.apply(f,g))},i=c&&!d;return clearTimeout(d),d=setTimeout(h,b),i&&(e=a.apply(f,g)),e}},x.once=function(a){var b,c=!1;return function(){return c?b:(c=!0,b=a.apply(this,arguments),a=null,b)}},x.wrap=function(a,b){return function(){var c=[a];return g.apply(c,arguments),b.apply(this,c)}},x.compose=function(){var a=arguments;return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},x.after=function(a,b){return 0>=a?b():function(){return 1>--a?b.apply(this,arguments):void 0}},x.keys=v||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[];for(var c in a)x.has(a,c)&&(b[b.length]=c);return b},x.values=function(a){var b=[];for(var c in a)x.has(a,c)&&b.push(a[c]);return b},x.pairs=function(a){var b=[];for(var c in a)x.has(a,c)&&b.push([c,a[c]]);return b},x.invert=function(a){var b={};for(var c in a)x.has(a,c)&&(b[a[c]]=c);return b},x.functions=x.methods=function(a){var b=[];for(var c in a)x.isFunction(a[c])&&b.push(c);return b.sort()},x.extend=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)a[c]=b[c]}),a},x.pick=function(a){var b={},c=i.apply(d,h.call(arguments,1));return y(c,function(c){c in a&&(b[c]=a[c])}),b},x.omit=function(a){var b={},c=i.apply(d,h.call(arguments,1));for(var e in a)x.contains(c,e)||(b[e]=a[e]);return b},x.defaults=function(a){return y(h.call(arguments,1),function(b){if(b)for(var c in b)null==a[c]&&(a[c]=b[c])}),a},x.clone=function(a){return x.isObject(a)?x.isArray(a)?a.slice():x.extend({},a):a},x.tap=function(a,b){return b(a),a};var E=function(a,b,c,d){if(a===b)return 0!==a||1/a==1/b;if(null==a||null==b)return a===b;a instanceof x&&(a=a._wrapped),b instanceof x&&(b=b._wrapped);var e=j.call(a);if(e!=j.call(b))return!1;switch(e){case"[object String]":return a==b+"";case"[object Number]":return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case"[object Date]":case"[object Boolean]":return+a==+b;case"[object RegExp]":return a.source==b.source&&a.global==b.global&&a.multiline==b.multiline&&a.ignoreCase==b.ignoreCase}if("object"!=typeof a||"object"!=typeof b)return!1;for(var f=c.length;f--;)if(c[f]==a)return d[f]==b;c.push(a),d.push(b);var g=0,h=!0;if("[object Array]"==e){if(g=a.length,h=g==b.length)for(;g--&&(h=E(a[g],b[g],c,d)););}else{var i=a.constructor,k=b.constructor;if(i!==k&&!(x.isFunction(i)&&i instanceof i&&x.isFunction(k)&&k instanceof k))return!1;for(var l in a)if(x.has(a,l)&&(g++,!(h=x.has(b,l)&&E(a[l],b[l],c,d))))break;if(h){for(l in b)if(x.has(b,l)&&!g--)break;h=!g}}return c.pop(),d.pop(),h};x.isEqual=function(a,b){return E(a,b,[],[])},x.isEmpty=function(a){if(null==a)return!0;if(x.isArray(a)||x.isString(a))return 0===a.length;for(var b in a)if(x.has(a,b))return!1;return!0},x.isElement=function(a){return!(!a||1!==a.nodeType)},x.isArray=u||function(a){return"[object Array]"==j.call(a)},x.isObject=function(a){return a===Object(a)},y(["Arguments","Function","String","Number","Date","RegExp"],function(a){x["is"+a]=function(b){return j.call(b)=="[object "+a+"]"}}),x.isArguments(arguments)||(x.isArguments=function(a){return!(!a||!x.has(a,"callee"))}),"function"!=typeof/./&&(x.isFunction=function(a){return"function"==typeof a}),x.isFinite=function(a){return isFinite(a)&&!isNaN(parseFloat(a))},x.isNaN=function(a){return x.isNumber(a)&&a!=+a},x.isBoolean=function(a){return a===!0||a===!1||"[object Boolean]"==j.call(a)},x.isNull=function(a){return null===a},x.isUndefined=function(a){return void 0===a},x.has=function(a,b){return k.call(a,b)},x.noConflict=function(){return a._=b,this},x.identity=function(a){return a},x.times=function(a,b,c){for(var d=Array(a),e=0;a>e;e++)d[e]=b.call(c,e);return d},x.random=function(a,b){return null==b&&(b=a,a=0),a+Math.floor(Math.random()*(b-a+1))};var F={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};F.unescape=x.invert(F.escape);var G={escape:RegExp("["+x.keys(F.escape).join("")+"]","g"),unescape:RegExp("("+x.keys(F.unescape).join("|")+")","g")};x.each(["escape","unescape"],function(a){x[a]=function(b){return null==b?"":(""+b).replace(G[a],function(b){return F[a][b]})}}),x.result=function(a,b){if(null==a)return null;var c=a[b];return x.isFunction(c)?c.call(a):c},x.mixin=function(a){y(x.functions(a),function(b){var c=x[b]=a[b];x.prototype[b]=function(){var a=[this._wrapped];return g.apply(a,arguments),L.call(this,c.apply(x,a))}})};var H=0;x.uniqueId=function(a){var b=++H+"";return a?a+b:b},x.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var I=/(.)^/,J={"'":"'","\\":"\\","\r":"r","\n":"n"," ":"t","\u2028":"u2028","\u2029":"u2029"},K=/\\|'|\r|\n|\t|\u2028|\u2029/g;x.template=function(a,b,c){var d;c=x.defaults({},c,x.templateSettings);var e=RegExp([(c.escape||I).source,(c.interpolate||I).source,(c.evaluate||I).source].join("|")+"|$","g"),f=0,g="__p+='";a.replace(e,function(b,c,d,e,h){return g+=a.slice(f,h).replace(K,function(a){return"\\"+J[a]}),c&&(g+="'+\n((__t=("+c+"))==null?'':_.escape(__t))+\n'"),d&&(g+="'+\n((__t=("+d+"))==null?'':__t)+\n'"),e&&(g+="';\n"+e+"\n__p+='"),f=h+b.length,b}),g+="';\n",c.variable||(g="with(obj||{}){\n"+g+"}\n"),g="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+g+"return __p;\n";try{d=Function(c.variable||"obj","_",g)}catch(h){throw h.source=g,h}if(b)return d(b,x);var i=function(a){return d.call(this,a,x)};return i.source="function("+(c.variable||"obj")+"){\n"+g+"}",i},x.chain=function(a){return x(a).chain()};var L=function(a){return this._chain?x(a).chain():a};x.mixin(x),y(["pop","push","reverse","shift","sort","splice","unshift"],function(a){var b=d[a];x.prototype[a]=function(){var c=this._wrapped;return b.apply(c,arguments),"shift"!=a&&"splice"!=a||0!==c.length||delete c[0],L.call(this,c)}}),y(["concat","join","slice"],function(a){var b=d[a];x.prototype[a]=function(){return L.call(this,b.apply(this._wrapped,arguments))}}),x.extend(x.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this),function(a){var b,c,d,e;!function(){var a={},f={};b=function(b,c,d){a[b]={deps:c,callback:d}},e=d=c=function(b){function d(a){if("."!==a.charAt(0))return a;for(var c=a.split("/"),d=b.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(e._eak_seen=a,f[b])return f[b];if(f[b]={},!a[b])throw new Error("Could not find module "+b);for(var g,h=a[b],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)k.push("exports"===i[l]?g={}:c(d(i[l])));var n=j.apply(this,k);return f[b]=g||n}}(),b("rsvp/all",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a,b){return c.all(a,b)}}),b("rsvp/all_settled",["./promise","./utils","exports"],function(a,b,c){"use strict";function d(a){return{state:"fulfilled",value:a}}function e(a){return{state:"rejected",reason:a}}var f=a["default"],g=b.isArray,h=b.isNonThenable;c["default"]=function(a,b){return new f(function(b){function c(a){return function(b){j(a,d(b))}}function i(a){return function(b){j(a,e(b))}}function j(a,c){m[a]=c,0===--l&&b(m)}if(!g(a))throw new TypeError("You must pass an array to allSettled.");var k,l=a.length;if(0===l)return void b([]);for(var m=new Array(l),n=0;n<a.length;n++)k=a[n],h(k)?j(n,d(k)):f.cast(k).then(c(n),i(n))},b)}}),b("rsvp/asap",["exports"],function(a){"use strict";function b(){return function(){process.nextTick(e)}}function c(){var a=0,b=new h(e),c=document.createTextNode("");return b.observe(c,{characterData:!0}),function(){c.data=a=++a%2}}function d(){return function(){setTimeout(e,1)}}function e(){for(var a=0;a<i.length;a++){var b=i[a],c=b[0],d=b[1];c(d)}i=[]}a["default"]=function(a,b){var c=i.push([a,b]);1===c&&f()};var f,g="undefined"!=typeof window?window:{},h=g.MutationObserver||g.WebKitMutationObserver,i=[];f="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?b():h?c():d()}),b("rsvp/config",["./events","exports"],function(a,b){"use strict";function c(a,b){return"onerror"===a?void e.on("error",b):2!==arguments.length?e[a]:void(e[a]=b)}var d=a["default"],e={instrument:!1};d.mixin(e),b.config=e,b.configure=c}),b("rsvp/defer",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a){var b={};return b.promise=new c(function(a,c){b.resolve=a,b.reject=c},a),b}}),b("rsvp/events",["exports"],function(a){"use strict";var b=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},c=function(a){var b=a._promiseCallbacks;return b||(b=a._promiseCallbacks={}),b};a["default"]={mixin:function(a){return a.on=this.on,a.off=this.off,a.trigger=this.trigger,a._promiseCallbacks=void 0,a},on:function(a,d){var e,f=c(this);e=f[a],e||(e=f[a]=[]),-1===b(e,d)&&e.push(d)},off:function(a,d){var e,f,g=c(this);return d?(e=g[a],f=b(e,d),void(-1!==f&&e.splice(f,1))):void(g[a]=[])},trigger:function(a,b){var d,e,f=c(this);if(d=f[a])for(var g=0;g<d.length;g++)(e=d[g])(b)}}}),b("rsvp/filter",["./all","./map","./utils","exports"],function(a,b,c,d){"use strict";function e(a,b,c){if(!i(a))throw new TypeError("You must pass an array to filter.");if(!h(b))throw new TypeError("You must pass a function to filter's second argument.");return f(a,c).then(function(d){return g(a,b,c).then(function(a){var b,c=d.length,e=[];for(b=0;c>b;b++)a[b]&&e.push(d[b]);return e})})}var f=a["default"],g=b["default"],h=c.isFunction,i=c.isArray;d["default"]=e}),b("rsvp/hash",["./promise","./utils","exports"],function(a,b,c){"use strict";var d=a["default"],e=b.isNonThenable,f=b.keysOf;c["default"]=function(a){return new d(function(b,c){function g(a){return function(c){k[a]=c,0===--m&&b(k)}}function h(a){m=0,c(a)}var i,j,k={},l=f(a),m=l.length;if(0===m)return void b(k);for(var n=0;n<l.length;n++)j=l[n],i=a[j],e(i)?(k[j]=i,0===--m&&b(k)):d.cast(i).then(g(j),h)})}}),b("rsvp/instrument",["./config","./utils","exports"],function(a,b,c){"use strict";var d=a.config,e=b.now;c["default"]=function(a,b,c){try{d.trigger(a,{guid:b._guidKey+b._id,eventName:a,detail:b._detail,childGuid:c&&b._guidKey+c._id,label:b._label,timeStamp:e(),stack:new Error(b._label).stack})}catch(f){setTimeout(function(){throw f},0)}}}),b("rsvp/map",["./promise","./all","./utils","exports"],function(a,b,c,d){"use strict";var e=(a["default"],b["default"]),f=c.isArray,g=c.isFunction;d["default"]=function(a,b,c){if(!f(a))throw new TypeError("You must pass an array to map.");if(!g(b))throw new TypeError("You must pass a function to map's second argument.");return e(a,c).then(function(a){var d,f=a.length,g=[];for(d=0;f>d;d++)g.push(b(a[d]));return e(g,c)})}}),b("rsvp/node",["./promise","exports"],function(a,b){"use strict";function c(a,b){return function(c,d){c?b(c):a(arguments.length>2?e.call(arguments,1):d)}}var d=a["default"],e=Array.prototype.slice;b["default"]=function(a,b){return function(){var f=e.call(arguments),g=this||b;return new d(function(b,e){d.all(f).then(function(d){try{d.push(c(b,e)),a.apply(g,d)}catch(f){e(f)}})})}}}),b("rsvp/promise",["./config","./events","./instrument","./utils","./promise/cast","./promise/all","./promise/race","./promise/resolve","./promise/reject","exports"],function(a,b,c,d,e,f,g,h,i,j){"use strict";function k(){}function l(a,b){if(!z(a))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof l))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._id=H++,this._label=b,this._subscribers=[],w.instrument&&x("created",this),k!==a&&m(a,this)}function m(a,b){function c(a){r(b,a)}function d(a){t(b,a)}try{a(c,d)}catch(e){d(e)}}function n(a,b,c,d){var e=a._subscribers,f=e.length;e[f]=b,e[f+K]=c,e[f+L]=d}function o(a,b){var c,d,e=a._subscribers,f=a._detail;w.instrument&&x(b===K?"fulfilled":"rejected",a);for(var g=0;g<e.length;g+=3)c=e[g],d=e[g+b],p(b,c,d,f);a._subscribers=null}function p(a,b,c,d){var e,f,g,h,i=z(c);if(i)try{e=c(d),g=!0}catch(j){h=!0,f=j}else e=d,g=!0;q(b,e)||(i&&g?r(b,e):h?t(b,f):a===K?r(b,e):a===L&&t(b,e))}function q(a,b){var c,d=null;try{if(a===b)throw new TypeError("A promises callback cannot return that same promise.");if(y(b)&&(d=b.then,z(d)))return d.call(b,function(d){return c?!0:(c=!0,void(b!==d?r(a,d):s(a,d)))},function(b){return c?!0:(c=!0,void t(a,b))},"derived from: "+(a._label||" unknown promise")),!0}catch(e){return c?!0:(t(a,e),!0)}return!1}function r(a,b){a===b?s(a,b):q(a,b)||s(a,b)}function s(a,b){a._state===I&&(a._state=J,a._detail=b,w.async(u,a))}function t(a,b){a._state===I&&(a._state=J,a._detail=b,w.async(v,a))}function u(a){o(a,a._state=K)}function v(a){a._onerror&&a._onerror(a._detail),o(a,a._state=L)}var w=a.config,x=(b["default"],c["default"]),y=d.objectOrFunction,z=d.isFunction,A=d.now,B=e["default"],C=f["default"],D=g["default"],E=h["default"],F=i["default"],G="rsvp_"+A()+"-",H=0;j["default"]=l,l.cast=B,l.all=C,l.race=D,l.resolve=E,l.reject=F;var I=void 0,J=0,K=1,L=2;l.prototype={constructor:l,_id:void 0,_guidKey:G,_label:void 0,_state:void 0,_detail:void 0,_subscribers:void 0,_onerror:function(a){w.trigger("error",a)},then:function(a,b,c){var d=this;this._onerror=null;var e=new this.constructor(k,c);if(this._state){var f=arguments;w.async(function(){p(d._state,e,f[d._state-1],d._detail)})}else n(this,e,a,b);return w.instrument&&x("chained",d,e),e},"catch":function(a,b){return this.then(null,a,b)},"finally":function(a,b){var c=this.constructor;return this.then(function(b){return c.cast(a()).then(function(){return b})},function(b){return c.cast(a()).then(function(){throw b})},b)}}}),b("rsvp/promise/all",["../utils","exports"],function(a,b){"use strict";var c=a.isArray,d=a.isNonThenable;b["default"]=function(a,b){var e=this;return new e(function(b,f){function g(a){return function(c){k[a]=c,0===--j&&b(k)}}function h(a){j=0,f(a)}if(!c(a))throw new TypeError("You must pass an array to all.");var i,j=a.length,k=new Array(j);if(0===j)return void b(k);for(var l=0;l<a.length;l++)i=a[l],d(i)?(k[l]=i,0===--j&&b(k)):e.cast(i).then(g(l),h)},b)}}),b("rsvp/promise/cast",["exports"],function(a){"use strict";a["default"]=function(a,b){var c=this;return a&&"object"==typeof a&&a.constructor===c?a:new c(function(b){b(a)},b)}}),b("rsvp/promise/race",["../utils","exports"],function(a,b){"use strict";var c=a.isArray,d=(a.isFunction,a.isNonThenable);b["default"]=function(a,b){var e,f=this;return new f(function(b,g){function h(a){j&&(j=!1,b(a))}function i(a){j&&(j=!1,g(a))}if(!c(a))throw new TypeError("You must pass an array to race.");for(var j=!0,k=0;k<a.length;k++){if(e=a[k],d(e))return j=!1,void b(e);f.cast(e).then(h,i)}},b)}}),b("rsvp/promise/reject",["exports"],function(a){"use strict";a["default"]=function(a,b){var c=this;return new c(function(b,c){c(a)},b)}}),b("rsvp/promise/resolve",["exports"],function(a){"use strict";a["default"]=function(a,b){var c=this;return new c(function(b){b(a)},b)}}),b("rsvp/race",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a,b){return c.race(a,b)}}),b("rsvp/reject",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a,b){return c.reject(a,b)}}),b("rsvp/resolve",["./promise","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a,b){return c.resolve(a,b)}}),b("rsvp/rethrow",["exports"],function(a){"use strict";a["default"]=function(a){throw setTimeout(function(){throw a}),a}}),b("rsvp/utils",["exports"],function(a){"use strict";function b(a){return"function"==typeof a||"object"==typeof a&&null!==a}function c(a){return"function"==typeof a}function d(a){return!b(a)}function e(a){return"[object Array]"===Object.prototype.toString.call(a)}a.objectOrFunction=b,a.isFunction=c,a.isNonThenable=d,a.isArray=e;var f=Date.now||function(){return(new Date).getTime()};a.now=f;var g=Object.keys||function(a){var b=[];for(var c in a)b.push(c);return b};a.keysOf=g}),b("rsvp",["./rsvp/promise","./rsvp/events","./rsvp/node","./rsvp/all","./rsvp/all_settled","./rsvp/race","./rsvp/hash","./rsvp/rethrow","./rsvp/defer","./rsvp/config","./rsvp/map","./rsvp/resolve","./rsvp/reject","./rsvp/asap","./rsvp/filter","exports"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){"use strict";function q(a,b){C.async(a,b)}function r(){C.on.apply(C,arguments)}function s(){C.off.apply(C,arguments)}var t=a["default"],u=b["default"],v=c["default"],w=d["default"],x=e["default"],y=f["default"],z=g["default"],A=h["default"],B=i["default"],C=j.config,D=j.configure,E=k["default"],F=l["default"],G=m["default"],H=n["default"],I=o["default"];if(C.async=H,"undefined"!=typeof window&&"object"==typeof window.__PROMISE_INSTRUMENTATION__){var J=window.__PROMISE_INSTRUMENTATION__;D("instrument",!0);for(var K in J)J.hasOwnProperty(K)&&r(K,J[K])}p.Promise=t,p.EventTarget=u,p.all=w,p.allSettled=x,p.race=y,p.hash=z,p.rethrow=A,p.defer=B,p.denodeify=v,p.configure=D,p.on=r,p.off=s,p.resolve=F,p.reject=G,p.async=q,p.map=E,p.filter=I}),a.RSVP=c("rsvp")}(window);var EPUBJS=EPUBJS||{};EPUBJS.VERSION="0.2.1",EPUBJS.plugins=EPUBJS.plugins||{},EPUBJS.filePath=EPUBJS.filePath||"/epubjs/",EPUBJS.Render={},function(a){var b=a.ePub||{},c=a.ePub=function(){var a,b;return"undefined"!=typeof arguments[0]&&"string"==typeof arguments[0]&&(a=arguments[0],arguments[1]&&"object"==typeof arguments[1]?(b=arguments[1],b.bookPath=a):b={bookPath:a}),arguments[0]&&"object"==typeof arguments[0]&&(b=arguments[0]),new EPUBJS.Book(b)};_.extend(c,{noConflict:function(){return a.ePub=b,this}}),"function"==typeof define&&define.amd?define(function(){return c}):"undefined"!=typeof module&&module.exports&&(module.exports=c)}(window),EPUBJS.Book=function(a){this.settings=_.defaults(a||{},{bookPath:null,bookKey:null,packageUrl:null,storage:!1,fromStorage:!1,saved:!1,online:!0,contained:!1,width:null,height:null,layoutOveride:null,orientation:null,minSpreadWidth:800,gap:"auto",version:1,restore:!1,reload:!1,"goto":!1,styles:{},headTags:{},withCredentials:!1,render_method:"Iframe"}),this.settings.EPUBJSVERSION=EPUBJS.VERSION,this.spinePos=0,this.stored=!1,this.online=this.settings.online||navigator.onLine,this.networkListeners(),this.store=!1,this.settings.storage!==!1&&(this.storage=new fileStorage.storage(this.settings.storage)),this.ready={manifest:new RSVP.defer,spine:new RSVP.defer,metadata:new RSVP.defer,cover:new RSVP.defer,toc:new RSVP.defer,pageList:new RSVP.defer},this.readyPromises=[this.ready.manifest.promise,this.ready.spine.promise,this.ready.metadata.promise,this.ready.cover.promise,this.ready.toc.promise],this.pageList=[],this.pagination=new EPUBJS.Pagination,this.pageListReady=this.ready.pageList.promise,this.ready.all=RSVP.all(this.readyPromises),this.ready.all.then(this._ready.bind(this)),this.isRendered=!1,this._q=EPUBJS.core.queue(this),this._rendering=!1,this._displayQ=EPUBJS.core.queue(this),this._moving=!1,this._gotoQ=EPUBJS.core.queue(this),this.renderer=new EPUBJS.Renderer(this.settings.render_method),this.renderer.setMinSpreadWidth(this.settings.minSpreadWidth),this.renderer.setGap(this.settings.gap),this.listenToRenderer(this.renderer),this.defer_opened=new RSVP.defer,this.opened=this.defer_opened.promise,"string"==typeof this.settings.bookPath&&this.open(this.settings.bookPath,this.settings.reload),window.addEventListener("beforeunload",this.unload.bind(this),!1)},EPUBJS.Book.prototype.open=function(a,b){var c,d=this,e=new RSVP.defer;return this.settings.bookPath=a,this.bookUrl=this.urlFrom(a),this.settings.contained||this.isContained(a)?(this.settings.contained=this.contained=!0,this.bookUrl="",c=this.unarchive(a).then(function(){return d.loadPackage()})):c=this.loadPackage(),c.then(this.settings.restore&&!b&&localStorage?function(a){var b=d.packageIdentifier(a),c=d.restore(b);c||d.unpack(a),e.resolve(),d.defer_opened.resolve()}:function(a){d.unpack(a),e.resolve(),d.defer_opened.resolve()}),this.online&&this.settings.storage&&!this.settings.contained&&(this.settings.stored||e.then(d.storeOffline())),this._registerReplacements(this.renderer),e.promise},EPUBJS.Book.prototype.loadPackage=function(a){var b,c=this,d=new EPUBJS.Parser,e=a||"META-INF/container.xml";return b=this.settings.packageUrl?c.loadXml(c.settings.packageUrl):c.loadXml(c.bookUrl+e).then(function(a){return d.container(a)}).then(function(a){return c.settings.contentsPath=c.bookUrl+a.basePath,c.settings.packageUrl=c.bookUrl+a.packagePath,c.settings.encoding=a.encoding,c.loadXml(c.settings.packageUrl)}),b.catch(function(){console.error("Could not load book at: "+e),c.trigger("book:loadFailed",e)}),b},EPUBJS.Book.prototype.packageIdentifier=function(a){var b=new EPUBJS.Parser;return b.identifier(a)},EPUBJS.Book.prototype.unpack=function(a){var b=this,c=new EPUBJS.Parser;b.contents=c.packageContents(a,b.settings.contentsPath),b.manifest=b.contents.manifest,b.spine=b.contents.spine,b.spineIndexByURL=b.contents.spineIndexByURL,b.metadata=b.contents.metadata,b.settings.bookKey||(b.settings.bookKey=b.generateBookKey(b.metadata.identifier)),b.globalLayoutProperties=b.parseLayoutProperties(b.metadata),b.cover=b.contents.cover=b.settings.contentsPath+b.contents.coverPath,b.spineNodeIndex=b.contents.spineNodeIndex,b.ready.manifest.resolve(b.contents.manifest),b.ready.spine.resolve(b.contents.spine),b.ready.metadata.resolve(b.contents.metadata),b.ready.cover.resolve(b.contents.cover),b.contents.navPath?(b.settings.navUrl=b.settings.contentsPath+b.contents.navPath,b.loadXml(b.settings.navUrl).then(function(a){return c.nav(a,b.spineIndexByURL,b.spine)}).then(function(a){b.toc=b.contents.toc=a,b.ready.toc.resolve(b.contents.toc)},function(){b.ready.toc.resolve(!1)}),b.loadXml(b.settings.navUrl).then(function(a){return c.pageList(a,b.spineIndexByURL,b.spine)}).then(function(a){var c=new EPUBJS.EpubCFI,d=0;0!==a.length&&(b.pageList=b.contents.pageList=a,b.pageList.forEach(function(a){a.cfi||(d+=1,c.generateCfiFromHref(a.href,b).then(function(c){a.cfi=c,a.packageUrl=b.settings.packageUrl,d-=1,0===d&&(b.pagination.process(b.pageList),b.ready.pageList.resolve(b.pageList))}))}),d||(b.pagination.process(b.pageList),b.ready.pageList.resolve(b.pageList)))},function(){b.ready.pageList.resolve([])})):b.contents.tocPath?(b.settings.tocUrl=b.settings.contentsPath+b.contents.tocPath,b.loadXml(b.settings.tocUrl).then(function(a){return c.toc(a,b.spineIndexByURL,b.spine)}).then(function(a){b.toc=b.contents.toc=a,b.ready.toc.resolve(b.contents.toc)},function(){b.ready.toc.resolve(!1)})):b.ready.toc.resolve(!1)},EPUBJS.Book.prototype.createHiddenRender=function(a,b,c){var d,e,f=this.element.getBoundingClientRect(),g=b||this.settings.width||f.width,h=c||this.settings.height||f.height;return a.setMinSpreadWidth(this.settings.minSpreadWidth),a.setGap(this.settings.gap),this._registerReplacements(a),this.settings.forceSingle&&a.forceSingle(!0),d=document.createElement("div"),d.style.visibility="hidden",d.style.overflow="hidden",d.style.width="0",d.style.height="0",this.element.appendChild(d),e=document.createElement("div"),e.style.visibility="hidden",e.style.overflow="hidden",e.style.width=g+"px",e.style.height=h+"px",d.appendChild(e),a.initialize(e),d},EPUBJS.Book.prototype.generatePageList=function(a,b){{var c=[],d=new EPUBJS.Renderer(this.settings.render_method,!1),e=this.createHiddenRender(d,a,b),f=new RSVP.defer,g=-1,h=this.spine.length,i=0,j=function(a){var b,e=g+1,f=a||new RSVP.defer;return e>=h?f.resolve():(g=e,b=new EPUBJS.Chapter(this.spine[g],this.store),d.displayChapter(b,this.globalLayoutProperties).then(function(){d.pageMap.forEach(function(a){i+=1,c.push({cfi:a.start,page:i})}),d.pageMap.length%2>0&&d.spreads&&(i+=1,c.push({cfi:d.pageMap[d.pageMap.length-1].end,page:i})),setTimeout(function(){j(f)},1)})),f.promise}.bind(this);j().then(function(){d.remove(),this.element.removeChild(e),f.resolve(c)}.bind(this))}return f.promise},EPUBJS.Book.prototype.generatePagination=function(a,b){var c=this,d=new RSVP.defer;return this.ready.spine.promise.then(function(){c.generatePageList(a,b).then(function(a){c.pageList=c.contents.pageList=a,c.pagination.process(a),c.ready.pageList.resolve(c.pageList),d.resolve(c.pageList)})}),d.promise},EPUBJS.Book.prototype.loadPagination=function(a){var b=JSON.parse(a);return b&&b.length&&(this.pageList=b,this.pagination.process(this.pageList),this.ready.pageList.resolve(this.pageList)),this.pageList},EPUBJS.Book.prototype.getPageList=function(){return this.ready.pageList.promise},EPUBJS.Book.prototype.getMetadata=function(){return this.ready.metadata.promise},EPUBJS.Book.prototype.getToc=function(){return this.ready.toc.promise
},EPUBJS.Book.prototype.networkListeners=function(){var a=this;window.addEventListener("offline",function(){a.online=!1,a.trigger("book:offline")},!1),window.addEventListener("online",function(){a.online=!0,a.trigger("book:online")},!1)},EPUBJS.Book.prototype.listenToRenderer=function(a){var b=this;a.Events.forEach(function(c){a.on(c,function(a){b.trigger(c,a)})}),a.on("renderer:visibleRangeChanged",function(a){var b,c,d,e=[];this.pageList.length>0&&(b=this.pagination.pageFromCfi(a.start),d=this.pagination.percentageFromPage(b),e.push(b),a.end&&(c=this.pagination.pageFromCfi(a.end),e.push(c)),this.trigger("book:pageChanged",{anchorPage:b,percentage:d,pageRange:e}))}.bind(this)),a.on("render:loaded",this.loadChange.bind(this))},EPUBJS.Book.prototype.loadChange=function(a){var b,c=EPUBJS.core.uri(a);this.currentChapter&&(b=EPUBJS.core.uri(this.currentChapter.absolute)),!this._rendering&&this.currentChapter&&c.path!=b.path&&(console.warn("Miss Match",c.path,this.currentChapter.absolute),this.goto(c.filename))},EPUBJS.Book.prototype.unlistenToRenderer=function(a){a.Events.forEach(function(b){a.off(b)})},EPUBJS.Book.prototype.loadXml=function(a){return this.settings.fromStorage?this.storage.getXml(a,this.settings.encoding):this.settings.contained?this.zip.getXml(a,this.settings.encoding):EPUBJS.core.request(a,"xml",this.settings.withCredentials)},EPUBJS.Book.prototype.urlFrom=function(a){var b,c=EPUBJS.core.uri(a),d=c.protocol,e="/"==c.path[0],f=window.location,g=f.origin||f.protocol+"//"+f.host,h=document.getElementsByTagName("base");return h.length&&(b=h[0].href),c.protocol?c.origin+c.path:!d&&e?(b||g)+c.path:d||e?void 0:EPUBJS.core.resolveUrl(b||f.pathname,c.path)},EPUBJS.Book.prototype.unarchive=function(a){return this.zip=new EPUBJS.Unarchiver,this.store=this.zip,this.zip.openZip(a)},EPUBJS.Book.prototype.isContained=function(a){var b=EPUBJS.core.uri(a);return!b.extension||"epub"!=b.extension&&"zip"!=b.extension?!1:!0},EPUBJS.Book.prototype.isSaved=function(a){var b;return localStorage?(b=localStorage.getItem(a),localStorage&&null!==b?!0:!1):!1},EPUBJS.Book.prototype.generateBookKey=function(a){return"epubjs:"+EPUBJS.VERSION+":"+window.location.host+":"+a},EPUBJS.Book.prototype.saveContents=function(){return localStorage?void localStorage.setItem(this.settings.bookKey,JSON.stringify(this.contents)):!1},EPUBJS.Book.prototype.removeSavedContents=function(){return localStorage?void localStorage.removeItem(this.settings.bookKey):!1},EPUBJS.Book.prototype.renderTo=function(a){var b,c=this;if(_.isElement(a))this.element=a;else{if("string"!=typeof a)return void console.error("Not an Element");this.element=EPUBJS.core.getEl(a)}return b=this.opened.then(function(){return c.renderer.initialize(c.element,c.settings.width,c.settings.height),c._rendered(),c.startDisplay()})},EPUBJS.Book.prototype.startDisplay=function(){var a;return a=this.settings.goto?this.goto(this.settings.goto):this.settings.previousLocationCfi?this.gotoCfi(this.settings.previousLocationCfi):this.displayChapter(this.spinePos)},EPUBJS.Book.prototype.restore=function(a){var b,c=this,d=["manifest","spine","metadata","cover","toc","spineNodeIndex","spineIndexByURL","globalLayoutProperties"],e=!1,f=this.generateBookKey(a),g=localStorage.getItem(f),h=d.length;if(this.settings.clearSaved&&(e=!0),!e&&"undefined"!=g&&null!==g)for(c.contents=JSON.parse(g),b=0;h>b;b++){var i=d[b];if(!c.contents[i]){e=!0;break}c[i]=c.contents[i]}return!e&&g&&this.contents&&this.settings.contentsPath?(this.settings.bookKey=f,this.ready.manifest.resolve(this.manifest),this.ready.spine.resolve(this.spine),this.ready.metadata.resolve(this.metadata),this.ready.cover.resolve(this.cover),this.ready.toc.resolve(this.toc),!0):!1},EPUBJS.Book.prototype.displayChapter=function(a,b,c){var d,e,f,g,h=this,i=c||new RSVP.defer;return this.isRendered?this._rendering||this._rendering?(this._displayQ.enqueue("displayChapter",[a,b,i]),i.promise):(_.isNumber(a)?f=a:(e=new EPUBJS.EpubCFI(a),f=e.spinePos),(0>f||f>=this.spine.length)&&(console.warn("Not A Valid Location"),f=0,b=!1,e=!1),g=new EPUBJS.Chapter(this.spine[f],this.store),this._rendering=!0,d=h.renderer.displayChapter(g,this.globalLayoutProperties),e?h.renderer.gotoCfi(e):b&&h.renderer.lastPage(),d.then(function(){h.spinePos=f,i.resolve(h.renderer),h.settings.fromStorage||h.settings.contained||h.preloadNextChapter(),h.currentChapter=g,h._rendering=!1,h._displayQ.dequeue(),0===h._displayQ.length()&&h._gotoQ.dequeue()},function(a){console.error("Could not load Chapter: "+g.absolute),h.trigger("book:chapterLoadFailed",g.absolute),h._rendering=!1,i.reject(a)}),i.promise):(this._q.enqueue("displayChapter",arguments),i.reject({message:"Rendering",stack:(new Error).stack}),i.promise)},EPUBJS.Book.prototype.nextPage=function(){var a;return this.isRendered?(a=this.renderer.nextPage(),a?void 0:this.nextChapter()):this._q.enqueue("nextPage",arguments)},EPUBJS.Book.prototype.prevPage=function(){var a;return this.isRendered?(a=this.renderer.prevPage(),a?void 0:this.prevChapter()):this._q.enqueue("prevPage",arguments)},EPUBJS.Book.prototype.nextChapter=function(){var a;if(this.spinePos<this.spine.length-1){for(a=this.spinePos+1;this.spine[a]&&this.spine[a].linear&&"no"==this.spine[a].linear;)a++;if(a<this.spine.length-1)return this.displayChapter(a);this.trigger("book:atEnd")}else this.trigger("book:atEnd")},EPUBJS.Book.prototype.prevChapter=function(){var a;if(this.spinePos>0){for(a=this.spinePos-1;this.spine[a]&&this.spine[a].linear&&"no"==this.spine[a].linear;)a--;if(a>=0)return this.displayChapter(a,!0);this.trigger("book:atStart")}else this.trigger("book:atStart")},EPUBJS.Book.prototype.getCurrentLocationCfi=function(){return this.isRendered?this.renderer.currentLocationCfi:!1},EPUBJS.Book.prototype.goto=function(a){return 0===a.indexOf("epubcfi(")?this.gotoCfi(a):a.indexOf("%")===a.length-1?this.gotoPercentage(parseInt(a.substring(0,a.length-1))/100):"number"==typeof a||isNaN(a)===!1?this.gotoPage(a):this.gotoHref(a)},EPUBJS.Book.prototype.gotoCfi=function(a,b){var c,d,e,f=b||new RSVP.defer;return this.isRendered?this._moving||this._rendering?(console.warn("Renderer is moving"),this._gotoQ.enqueue("gotoCfi",[a,f]),!1):(c=new EPUBJS.EpubCFI(a),d=c.spinePos,-1==d?!1:(e=this.spine[d],promise=f.promise,this._moving=!0,this.currentChapter&&this.spinePos===d?(this.renderer.gotoCfi(c),this._moving=!1,f.resolve(this.renderer.currentLocationCfi)):(e&&-1!=d||(d=0,e=this.spine[d]),this.currentChapter=new EPUBJS.Chapter(e,this.store),this.currentChapter&&(this.spinePos=d,render=this.renderer.displayChapter(this.currentChapter,this.globalLayoutProperties),this.renderer.gotoCfi(c),render.then(function(a){this._moving=!1,f.resolve(a.currentLocationCfi)}.bind(this)))),promise.then(function(){this._gotoQ.dequeue()}.bind(this)),promise)):(console.warn("Not yet Rendered"),this.settings.previousLocationCfi=a,!1)},EPUBJS.Book.prototype.gotoHref=function(a,b){var c,d,e,f,g,h=b||new RSVP.defer;return this.isRendered?this._moving||this._rendering?(this._gotoQ.enqueue("gotoHref",[a,h]),!1):(c=a.split("#"),d=c[0],e=c[1]||!1,f=d.replace(this.settings.contentsPath,""),g=this.spineIndexByURL[f],d||(g=this.currentChapter?this.currentChapter.spinePos:0),"number"!=typeof g?!1:this.currentChapter&&g==this.currentChapter.spinePos?(e?this.renderer.section(e):this.renderer.firstPage(),h.resolve(this.renderer.currentLocationCfi),h.promise.then(function(){this._gotoQ.dequeue()}.bind(this)),h.promise):this.displayChapter(g).then(function(){e&&this.renderer.section(e),h.resolve(this.renderer.currentLocationCfi)}.bind(this))):(this.settings.goto=a,!1)},EPUBJS.Book.prototype.gotoPage=function(a){var b=this.pagination.cfiFromPage(a);return this.gotoCfi(b)},EPUBJS.Book.prototype.gotoPercentage=function(a){var b=this.pagination.pageFromPercentage(a);return this.gotoPage(b)},EPUBJS.Book.prototype.preloadNextChapter=function(){var a,b=this.spinePos+1;return b>=this.spine.length?!1:(a=new EPUBJS.Chapter(this.spine[b]),void(a&&EPUBJS.core.request(a.absolute)))},EPUBJS.Book.prototype.storeOffline=function(){var a=this,b=_.values(this.manifest);return EPUBJS.storage.batch(b).then(function(){a.settings.stored=!0,a.trigger("book:stored")})},EPUBJS.Book.prototype.availableOffline=function(){return this.settings.stored>0?!0:!1},EPUBJS.Book.prototype.setStyle=function(a,b,c){var d=["color","background","background-color"];return this.isRendered?(this.settings.styles[a]=b,this.renderer.setStyle(a,b,c),void(-1===d.indexOf(a)&&(clearTimeout(this.reformatTimeout),this.reformatTimeout=setTimeout(function(){this.renderer.reformat()}.bind(this),10)))):this._q.enqueue("setStyle",arguments)},EPUBJS.Book.prototype.removeStyle=function(a){return this.isRendered?(this.renderer.removeStyle(a),this.renderer.reformat(),void delete this.settings.styles[a]):this._q.enqueue("removeStyle",arguments)},EPUBJS.Book.prototype.addHeadTag=function(a,b){return this.isRendered?void(this.settings.headTags[a]=b):this._q.enqueue("addHeadTag",arguments)},EPUBJS.Book.prototype.useSpreads=function(a){console.warn("useSpreads is deprecated, use forceSingle or set a layoutOveride instead"),this.forceSingle(a===!1?!0:!1)},EPUBJS.Book.prototype.forceSingle=function(a){this.renderer.forceSingle(a),this.settings.forceSingle=a,this.isRendered&&this.renderer.reformat()},EPUBJS.Book.prototype.setMinSpreadWidth=function(a){this.settings.minSpreadWidth=a,this.isRendered&&(this.renderer.setMinSpreadWidth(this.settings.minSpreadWidth),this.renderer.reformat())},EPUBJS.Book.prototype.setGap=function(a){this.settings.gap=a,this.isRendered&&(this.renderer.setGap(this.settings.gap),this.renderer.reformat())},EPUBJS.Book.prototype.unload=function(){this.settings.restore&&localStorage&&this.saveContents(),this.unlistenToRenderer(this.renderer),this.trigger("book:unload")},EPUBJS.Book.prototype.destroy=function(){window.removeEventListener("beforeunload",this.unload),this.currentChapter&&this.currentChapter.unload(),this.unload(),this.render&&this.render.remove()},EPUBJS.Book.prototype._ready=function(){this.trigger("book:ready")},EPUBJS.Book.prototype._rendered=function(){this.isRendered=!0,this.trigger("book:rendered"),this._q.flush()},EPUBJS.Book.prototype.applyStyles=function(a,b){a.applyStyles(this.settings.styles),b()},EPUBJS.Book.prototype.applyHeadTags=function(a,b){a.applyHeadTags(this.settings.headTags),b()},EPUBJS.Book.prototype._registerReplacements=function(a){a.registerHook("beforeChapterDisplay",this.applyStyles.bind(this,a),!0),a.registerHook("beforeChapterDisplay",this.applyHeadTags.bind(this,a),!0),a.registerHook("beforeChapterDisplay",EPUBJS.replace.hrefs.bind(this),!0),this._needsAssetReplacement()&&a.registerHook("beforeChapterDisplay",[EPUBJS.replace.head,EPUBJS.replace.resources,EPUBJS.replace.svg],!0)},EPUBJS.Book.prototype._needsAssetReplacement=function(){return this.settings.fromStorage?"filesystem"==this.storage.getStorageType()?!1:!0:this.settings.contained?!0:!1},EPUBJS.Book.prototype.parseLayoutProperties=function(a){var b=this.layoutOveride&&this.layoutOveride.layout||a.layout||"reflowable",c=this.layoutOveride&&this.layoutOveride.spread||a.spread||"auto",d=this.layoutOveride&&this.layoutOveride.orientation||a.orientation||"auto";return{layout:b,spread:c,orientation:d}},RSVP.EventTarget.mixin(EPUBJS.Book.prototype),RSVP.on("error",function(){}),RSVP.configure("instrument",!0),RSVP.on("rejected",function(a){console.error(a.detail.message,a.detail.stack)}),EPUBJS.Chapter=function(a,b){this.href=a.href,this.absolute=a.url,this.id=a.id,this.spinePos=a.index,this.cfiBase=a.cfiBase,this.properties=a.properties,this.manifestProperties=a.manifestProperties,this.linear=a.linear,this.pages=1,this.store=b,this.epubcfi=new EPUBJS.EpubCFI},EPUBJS.Chapter.prototype.contents=function(a){var b=a||this.store;return b?b.get(href):EPUBJS.core.request(href,"xml")},EPUBJS.Chapter.prototype.url=function(a){var b,c=new RSVP.defer,d=a||this.store,e=this;return d?this.tempUrl?(b=this.tempUrl,c.resolve(b)):d.getUrl(this.absolute).then(function(a){e.tempUrl=a,c.resolve(a)}):(b=this.absolute,c.resolve(b)),c.promise},EPUBJS.Chapter.prototype.setPages=function(a){this.pages=a},EPUBJS.Chapter.prototype.getPages=function(){return this.pages},EPUBJS.Chapter.prototype.getID=function(){return this.ID},EPUBJS.Chapter.prototype.unload=function(a){this.contents=null,this.tempUrl&&a&&(a.revokeUrl(this.tempUrl),this.tempUrl=!1)},EPUBJS.Chapter.prototype.cfiFromRange=function(a){var b,c,d,e,f,g;if(this.contents){if(c=EPUBJS.core.getElementXPath(a.startContainer),d=EPUBJS.core.getElementXPath(a.endContainer),e=this.contents.evaluate(c,this.contents,EPUBJS.core.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,a.collapsed||(f=this.contents.evaluate(d,this.contents,EPUBJS.core.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue),b=this.contents.createRange(),e)try{b.setStart(e,a.startOffset),!a.collapsed&&f&&b.setEnd(f,a.endOffset)}catch(h){console.log("missed"),e=!1}return e||(console.log("not found, try fuzzy match"),cleanStartTextContent=EPUBJS.core.cleanStringForXpath(a.startContainer.textContent),c="//text()[contains(.,"+cleanStartTextContent+")]",e=this.contents.evaluate(c,this.contents,EPUBJS.core.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,e&&(b.setStart(e,a.startOffset),a.collapsed||(g=EPUBJS.core.cleanStringForXpath(a.endContainer.textContent),d="//text()[contains(.,"+g+")]",f=this.contents.evaluate(d,this.contents,EPUBJS.core.nsResolver,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,f&&b.setEnd(f,a.endOffset)))),this.epubcfi.generateCfiFromRange(b,this.cfiBase)}};var EPUBJS=EPUBJS||{};EPUBJS.core={},EPUBJS.core.getEl=function(a){return document.getElementById(a)},EPUBJS.core.getEls=function(a){return document.getElementsByClassName(a)},EPUBJS.core.request=function(a,b,c){function d(){if(this.readyState===this.DONE)if(200===this.status||this.responseXML){var a;a="xml"==b?this.responseXML:"json"==b?JSON.parse(this.response):"blob"==b?e?this.response:new Blob([this.response]):this.response,g.resolve(a)}else g.reject({message:this.response,stack:(new Error).stack})}var e=window.URL,f=e?"blob":"arraybuffer",g=new RSVP.defer,h=new XMLHttpRequest,i=XMLHttpRequest.prototype;return"overrideMimeType"in i||Object.defineProperty(i,"overrideMimeType",{value:function(){}}),c&&(h.withCredentials=!0),h.open("GET",a,!0),h.onreadystatechange=d,"blob"==b&&(h.responseType=f),"json"==b&&h.setRequestHeader("Accept","application/json"),"xml"==b&&h.overrideMimeType("text/xml"),h.send(),g.promise},EPUBJS.core.toArray=function(a){var b=[];for(var c in a){var d;a.hasOwnProperty(c)&&(d=a[c],d.ident=c,b.push(d))}return b},EPUBJS.core.uri=function(a){var b,c,d,e={protocol:"",host:"",path:"",origin:"",directory:"",base:"",filename:"",extension:"",fragment:"",href:a},f=a.indexOf("://"),g=a.indexOf("?"),h=a.indexOf("#");return-1!=h&&(e.fragment=a.slice(h+1),a=a.slice(0,h)),-1!=g&&(e.search=a.slice(g+1),a=a.slice(0,g),href=a),-1!=f?(e.protocol=a.slice(0,f),b=a.slice(f+3),d=b.indexOf("/"),-1===d?(e.host=e.path,e.path=""):(e.host=b.slice(0,d),e.path=b.slice(d)),e.origin=e.protocol+"://"+e.host,e.directory=EPUBJS.core.folder(e.path),e.base=e.origin+e.directory):(e.path=a,e.directory=EPUBJS.core.folder(a),e.base=e.directory),e.filename=a.replace(e.base,""),c=e.filename.lastIndexOf("."),-1!=c&&(e.extension=e.filename.slice(c+1)),e},EPUBJS.core.folder=function(a){var b=a.lastIndexOf("/");if(-1==b)var c="";return c=a.slice(0,b+1)},EPUBJS.core.dataURLToBlob=function(a){var b,c,d,e,f,g=";base64,";if(-1==a.indexOf(g))return b=a.split(","),c=b[0].split(":")[1],d=b[1],new Blob([d],{type:c});b=a.split(g),c=b[0].split(":")[1],d=window.atob(b[1]),e=d.length,f=new Uint8Array(e);for(var h=0;e>h;++h)f[h]=d.charCodeAt(h);return new Blob([f],{type:c})},EPUBJS.core.addScript=function(a,b,c){var d,e;e=!1,d=document.createElement("script"),d.type="text/javascript",d.async=!1,d.src=a,d.onload=d.onreadystatechange=function(){e||this.readyState&&"complete"!=this.readyState||(e=!0,b&&b())},c=c||document.body,c.appendChild(d)},EPUBJS.core.addScripts=function(a,b,c){var d=a.length,e=0,f=function(){e++,d==e?b&&b():EPUBJS.core.addScript(a[e],f,c)};EPUBJS.core.addScript(a[e],f,c)},EPUBJS.core.addCss=function(a,b,c){var d,e;e=!1,d=document.createElement("link"),d.type="text/css",d.rel="stylesheet",d.href=a,d.onload=d.onreadystatechange=function(){e||this.readyState&&"complete"!=this.readyState||(e=!0,b&&b())},c=c||document.body,c.appendChild(d)},EPUBJS.core.prefixed=function(a){var b=["Webkit","Moz","O","ms"],c=a[0].toUpperCase()+a.slice(1),d=b.length;if("undefined"!=typeof document.body.style[a])return a;for(var e=0;d>e;e++)if("undefined"!=typeof document.body.style[b[e]+c])return b[e]+c;return a},EPUBJS.core.resolveUrl=function(a,b){var c,d,e=[],f=EPUBJS.core.uri(b),g=a.split("/");return f.host?b:(g.pop(),d=b.split("/"),d.forEach(function(a){".."===a?g.pop():e.push(a)}),c=g.concat(e),c.join("/"))},EPUBJS.core.uuid=function(){var a=(new Date).getTime(),b="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(b){var c=(a+16*Math.random())%16|0;return a=Math.floor(a/16),("x"==b?c:7&c|8).toString(16)});return b},EPUBJS.core.insert=function(a,b,c){var d=EPUBJS.core.locationOf(a,b,c);return b.splice(d,0,a),d},EPUBJS.core.locationOf=function(a,b,c,d,e){var f,g=d||0,h=e||b.length,i=parseInt(g+(h-g)/2);return c||(c=function(a,b){return a>b?1:b>a?-1:(a=b)?0:void 0}),0>=h-g?i:(f=c(b[i],a),h-g===1?f>0?i:i+1:0===f?i:-1===f?EPUBJS.core.locationOf(a,b,c,i,h):EPUBJS.core.locationOf(a,b,c,g,i))},EPUBJS.core.indexOfSorted=function(a,b,c,d,e){var f,g=d||0,h=e||b.length,i=parseInt(g+(h-g)/2);return c||(c=function(a,b){return a>b?1:b>a?-1:(a=b)?0:void 0}),0>=h-g?-1:(f=c(b[i],a),h-g===1?0===f?i:-1:0===f?i:-1===f?EPUBJS.core.indexOfSorted(a,b,c,i,h):EPUBJS.core.indexOfSorted(a,b,c,g,i))},EPUBJS.core.queue=function(a){var b=[],c=a,d=function(a,c,d){return b.push({funcName:a,args:c,context:d}),b},e=function(){var a;b.length&&(a=b.shift(),c[a.funcName].apply(a.context||c,a.args))},f=function(){for(;b.length;)e()},g=function(){b=[]},h=function(){return b.length};return{enqueue:d,dequeue:e,flush:f,clear:g,length:h}},EPUBJS.core.getElementXPath=function(a){return a&&a.id?'//*[@id="'+a.id+'"]':EPUBJS.core.getElementTreeXPath(a)},EPUBJS.core.getElementTreeXPath=function(a){var b,c,d,e,f=[],g="http://www.w3.org/1999/xhtml"===a.ownerDocument.documentElement.getAttribute("xmlns");for(a.nodeType===Node.TEXT_NODE&&(b=EPUBJS.core.indexOfTextNode(a)+1,f.push("text()["+b+"]"),a=a.parentNode);a&&1==a.nodeType;a=a.parentNode){b=0;for(var h=a.previousSibling;h;h=h.previousSibling)h.nodeType!=Node.DOCUMENT_TYPE_NODE&&h.nodeName==a.nodeName&&++b;c=a.nodeName.toLowerCase(),d=g?"xhtml:"+c:c,e=b?"["+(b+1)+"]":"",f.splice(0,0,d+e)}return f.length?"./"+f.join("/"):null},EPUBJS.core.nsResolver=function(a){var b={xhtml:"http://www.w3.org/1999/xhtml",epub:"http://www.idpf.org/2007/ops"};return b[a]||null},EPUBJS.core.cleanStringForXpath=function(a){var b=a.match(/[^'"]+|['"]/g);return b=b.map(function(a){return"'"===a?'"\'"':'"'===a?"'\"'":"'"+a+"'"}),"concat('',"+b.join(",")+")"},EPUBJS.core.indexOfTextNode=function(a){for(var b,c=a.parentNode,d=c.childNodes,e=-1,f=0;f<d.length&&(b=d[f],b.nodeType===Node.TEXT_NODE&&e++,b!=a);f++);return e},EPUBJS.EpubCFI=function(a){return a?this.parse(a):void 0},EPUBJS.EpubCFI.prototype.generateChapterComponent=function(a,b,c){var d=parseInt(b),e=a+1,f="/"+e+"/";return f+=2*(d+1),c&&(f+="["+c+"]"),f},EPUBJS.EpubCFI.prototype.generatePathComponent=function(a){var b=[];return a.forEach(function(a){var c="";c+=2*(a.index+1),a.id&&(c+="["+a.id+"]"),b.push(c)}),b.join("/")},EPUBJS.EpubCFI.prototype.generateCfiFromElement=function(a,b){var c=this.pathTo(a),d=this.generatePathComponent(c);return d.length?"epubcfi("+b+"!"+d+"/1:0)":"epubcfi("+b+"!/4/)"},EPUBJS.EpubCFI.prototype.pathTo=function(a){for(var b,c=[];a&&null!==a.parentNode&&9!=a.parentNode.nodeType;)b=a.parentNode.children,c.unshift({id:a.id,tagName:a.tagName,index:b?Array.prototype.indexOf.call(b,a):0}),a=a.parentNode;return c},EPUBJS.EpubCFI.prototype.getChapterComponent=function(a){var b=a.split("!");return b[0]},EPUBJS.EpubCFI.prototype.getPathComponent=function(a){var b=a.split("!"),c=b[1]?b[1].split(":"):"";return c[0]},EPUBJS.EpubCFI.prototype.getCharecterOffsetComponent=function(a){var b=a.split(":");return b[1]||""},EPUBJS.EpubCFI.prototype.parse=function(a){var b,c,d,e,f,g,h,i,j,k={},l=function(a){var b,c,d,e;return b="element",c=parseInt(a)/2-1,d=a.match(/\[(.*)\]/),d&&d[1]&&(e=d[1]),{type:b,index:c,id:e||!1}};return"string"!=typeof a?{spinePos:-1}:(k.str=a,0===a.indexOf("epubcfi(")&&")"===a[a.length-1]&&(a=a.slice(8,a.length-1)),c=this.getChapterComponent(a),d=this.getPathComponent(a)||"",e=this.getCharecterOffsetComponent(a),c&&(b=c.split("/")[2]||"")?(k.spinePos=parseInt(b)/2-1||0,g=b.match(/\[(.*)\]/),k.spineId=g?g[1]:!1,-1!=d.indexOf(",")&&console.warn("CFI Ranges are not supported"),h=d.split("/"),i=h.pop(),k.steps=[],h.forEach(function(a){var b;a&&(b=l(a),k.steps.push(b))}),j=parseInt(i),isNaN(j)||k.steps.push(j%2===0?l(i):{type:"text",index:(j-1)/2}),f=e.match(/\[(.*)\]/),f&&f[1]?(k.characterOffset=parseInt(e.split("[")[0]),k.textLocationAssertion=f[1]):k.characterOffset=parseInt(e),k):{spinePos:-1})},EPUBJS.EpubCFI.prototype.addMarker=function(a,b,c){var d,e,f,g,h=b||document,i=c||this.createMarker(h);return"string"==typeof a&&(a=this.parse(a)),e=a.steps[a.steps.length-1],-1===a.spinePos?!1:(d=this.findParent(a,h))?(e&&"text"===e.type?(f=d.childNodes[e.index],a.characterOffset?(g=f.splitText(a.characterOffset),i.classList.add("EPUBJS-CFI-SPLIT"),d.insertBefore(i,g)):d.insertBefore(i,f)):d.insertBefore(i,d.firstChild),i):!1},EPUBJS.EpubCFI.prototype.createMarker=function(a){var b=a||document,c=b.createElement("span");return c.id="EPUBJS-CFI-MARKER:"+EPUBJS.core.uuid(),c.classList.add("EPUBJS-CFI-MARKER"),c},EPUBJS.EpubCFI.prototype.removeMarker=function(a,b){a.classList.contains("EPUBJS-CFI-SPLIT")?(nextSib=a.nextSibling,prevSib=a.previousSibling,nextSib&&prevSib&&3===nextSib.nodeType&&3===prevSib.nodeType&&(prevSib.textContent+=nextSib.textContent,a.parentNode.removeChild(nextSib)),a.parentNode.removeChild(a)):a.classList.contains("EPUBJS-CFI-MARKER")&&a.parentNode.removeChild(a)},EPUBJS.EpubCFI.prototype.findParent=function(a,b){var c,d,e,f=b||document,g=f.getElementsByTagName("html")[0],h=Array.prototype.slice.call(g.children);if("string"==typeof a&&(a=this.parse(a)),d=a.steps.slice(0),!d.length)return f.getElementsByTagName("body")[0];for(;d&&d.length>0;){if(c=d.shift(),"text"===c.type?(e=g.childNodes[c.index],g=e.parentNode||g):g=c.id?f.getElementById(c.id):h[c.index],"undefined"==typeof g)return console.error("No Element For",c,a.str),!1;h=Array.prototype.slice.call(g.children)}return g},EPUBJS.EpubCFI.prototype.compare=function(a,b){if("string"==typeof a&&(a=new EPUBJS.EpubCFI(a)),"string"==typeof b&&(b=new EPUBJS.EpubCFI(b)),a.spinePos>b.spinePos)return 1;if(a.spinePos<b.spinePos)return-1;for(var c=0;c<a.steps.length;c++){if(!b.steps[c])return 1;if(a.steps[c].index>b.steps[c].index)return 1;if(a.steps[c].index<b.steps[c].index)return-1}return a.steps.length<b.steps.length?-1:a.characterOffset>b.characterOffset?1:a.characterOffset<b.characterOffset?-1:0},EPUBJS.EpubCFI.prototype.generateCfiFromHref=function(a,b){var c,d,e=EPUBJS.core.uri(a),f=e.path,g=e.fragment,h=b.spineIndexByURL[f],i=new RSVP.defer,j=new EPUBJS.EpubCFI;return"undefined"!=typeof h&&(d=b.spine[h],c=b.loadXml(d.url),c.then(function(a){var b,c=a.getElementById(g);b=j.generateCfiFromElement(c,d.cfiBase),i.resolve(b)})),i.promise},EPUBJS.EpubCFI.prototype.generateCfiFromTextNode=function(a,b,c){var d=a.parentNode,e=this.pathTo(d),f=this.generatePathComponent(e),g=1+2*Array.prototype.indexOf.call(d.childNodes,a);return"epubcfi("+c+"!"+f+"/"+g+":"+(b||0)+")"},EPUBJS.EpubCFI.prototype.generateCfiFromRangeAnchor=function(a,b){var c=a.anchorNode,d=a.anchorOffset;return this.generateCfiFromTextNode(c,d,b)},EPUBJS.EpubCFI.prototype.generateCfiFromRange=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n;if(c=a.startContainer,3===c.nodeType)d=c.parentNode,h=1+2*EPUBJS.core.indexOfTextNode(c),e=this.pathTo(d);else{if(a.collapsed)return this.generateCfiFromElement(c,b);e=this.pathTo(c)}return f=this.generatePathComponent(e),g=a.startOffset,a.collapsed?"epubcfi("+b+"!"+f+"/"+h+":"+g+")":(i=a.endContainer,3===i.nodeType?(j=i.parentNode,n=1+2*EPUBJS.core.indexOfTextNode(i),k=this.pathTo(j)):k=this.pathTo(i),l=this.generatePathComponent(k),m=a.endOffset,"epubcfi("+b+"!"+f+"/"+h+":"+g+","+l+"/"+n+":"+m+")")},EPUBJS.EpubCFI.prototype.generateXpathFromSteps=function(a){var b=[".","*"];return a.forEach(function(a){var c=a.index+1;b.push(a.id?"*[position()="+c+" and @id='"+a.id+"']":"text"===a.type?"text()["+c+"]":"*["+c+"]")}),b.join("/")},EPUBJS.EpubCFI.prototype.generateRangeFromCfi=function(a,b){var c,d,e,f,g=b||document,h=g.createRange();return"string"==typeof a&&(a=this.parse(a)),-1===a.spinePos?!1:(d=this.generateXpathFromSteps(a.steps),c=a.steps[a.steps.length-1],(e=g.evaluate(d,g,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue)?(e&&a.characterOffset>=0?(f=e.length,a.characterOffset<f?(h.setStart(e,a.characterOffset),h.setEnd(e,f)):(console.debug("offset greater than length:",a.characterOffset,f),h.setStart(e,f-1),h.setEnd(e,f))):e&&h.selectNode(e),h):null)},EPUBJS.Events=function(a,b){return this.events={},this.el=b?b:document.createElement("div"),a.createEvent=this.createEvent,a.tell=this.tell,a.listen=this.listen,a.deafen=this.deafen,a.listenUntil=this.listenUntil,this},EPUBJS.Events.prototype.createEvent=function(a){var b=new CustomEvent(a);return this.events[a]=b,b},EPUBJS.Events.prototype.tell=function(a,b){var c;this.events[a]?c=this.events[a]:(console.warn("No event:",a,"defined yet, creating."),c=this.createEvent(a)),b&&(c.msg=b),this.el.dispatchEvent(c)},EPUBJS.Events.prototype.listen=function(a,b,c){return this.events[a]?void(c?this.el.addEventListener(a,b.bind(c),!1):this.el.addEventListener(a,b,!1)):(console.warn("No event:",a,"defined yet, creating."),void this.createEvent(a))},EPUBJS.Events.prototype.deafen=function(a,b){this.el.removeEventListener(a,b,!1)},EPUBJS.Events.prototype.listenUntil=function(a,b,c,d){function e(){this.deafen(a,c),this.deafen(b,e)}this.listen(a,c,d),this.listen(b,e,this)},EPUBJS.hooks={},EPUBJS.Hooks=function(){function a(){}return a.prototype.getHooks=function(){var a;this.hooks={},Array.prototype.slice.call(arguments).forEach(function(a){this.hooks[a]=[]},this);for(var b in this.hooks)a=_.values(EPUBJS.hooks[b]),a.forEach(function(a){this.registerHook(b,a)},this)},a.prototype.registerHook=function(a,b,c){"undefined"!=typeof this.hooks[a]?"function"==typeof b?c?this.hooks[a].unshift(b):this.hooks[a].push(b):Array.isArray(b)&&b.forEach(function(b){c?this.hooks[a].unshift(b):this.hooks[a].push(b)},this):this.hooks[a]=[func]},a.prototype.triggerHooks=function(a,b,c){function d(){f--,0>=f&&b&&b()}var e,f;return"undefined"==typeof this.hooks[a]?!1:(e=this.hooks[a],f=e.length,0===f&&b&&b(),void e.forEach(function(a){a(d,c)}))},{register:function(a){if(void 0===EPUBJS.hooks[a]&&(EPUBJS.hooks[a]={}),"object"!=typeof EPUBJS.hooks[a])throw"Already registered: "+a;return EPUBJS.hooks[a]},mixin:function(b){for(var c in a.prototype)b[c]=a.prototype[c]}}}(),EPUBJS.Layout=EPUBJS.Layout||{},EPUBJS.Layout.Reflowable=function(){this.documentElement=null,this.spreadWidth=null},EPUBJS.Layout.Reflowable.prototype.format=function(a,b,c,d){var e=EPUBJS.core.prefixed("columnAxis"),f=EPUBJS.core.prefixed("columnGap"),g=EPUBJS.core.prefixed("columnWidth"),h=EPUBJS.core.prefixed("columnFill"),i=Math.floor(b),j=Math.floor(i/8),k=d>=0?d:j%2===0?j:j-1;return this.documentElement=a,this.spreadWidth=i+k,a.style.overflow="hidden",a.style.width=i+"px",a.style.height=c+"px",a.style[e]="horizontal",a.style[h]="auto",a.style[g]=i+"px",a.style[f]=k+"px",this.colWidth=i,this.gap=k,{pageWidth:this.spreadWidth,pageHeight:c}},EPUBJS.Layout.Reflowable.prototype.calculatePages=function(){var a,b;return this.documentElement.style.width="auto",a=this.documentElement.scrollWidth,b=Math.ceil(a/this.spreadWidth),{displayedPages:b,pageCount:b}},EPUBJS.Layout.ReflowableSpreads=function(){this.documentElement=null,this.spreadWidth=null},EPUBJS.Layout.ReflowableSpreads.prototype.format=function(a,b,c,d){var e=EPUBJS.core.prefixed("columnAxis"),f=EPUBJS.core.prefixed("columnGap"),g=EPUBJS.core.prefixed("columnWidth"),h=EPUBJS.core.prefixed("columnFill"),i=2,j=Math.floor(b),k=j%2===0?j:j-1,l=Math.floor(k/8),m=d>=0?d:l%2===0?l:l-1,n=Math.floor((k-m)/i);return this.documentElement=a,this.spreadWidth=(n+m)*i,a.style.overflow="hidden",a.style.width=k+"px",a.style.height=c+"px",a.style[e]="horizontal",a.style[h]="auto",a.style[f]=m+"px",a.style[g]=n+"px",this.colWidth=n,this.gap=m,{pageWidth:this.spreadWidth,pageHeight:c}},EPUBJS.Layout.ReflowableSpreads.prototype.calculatePages=function(){var a=this.documentElement.scrollWidth,b=Math.ceil(a/this.spreadWidth);return this.documentElement.style.width=a+this.spreadWidth+"px",{displayedPages:b,pageCount:2*b}},EPUBJS.Layout.Fixed=function(){this.documentElement=null},EPUBJS.Layout.Fixed=function(a){var b,c,d,e,f=EPUBJS.core.prefixed("columnWidth"),g=a.querySelector("[name=viewport");return this.documentElement=a,g&&g.hasAttribute("content")&&(b=g.getAttribute("content"),c=b.split(","),c[0]&&(d=c[0].replace("width=","")),c[1]&&(e=c[1].replace("height=",""))),a.style.width=d+"px"||"auto",a.style.height=e+"px"||"auto",a.style[f]="auto",a.style.overflow="auto",this.colWidth=d,this.gap=0,{pageWidth:d,pageHeight:e}},EPUBJS.Layout.Fixed.prototype.calculatePages=function(){return{displayedPages:1,pageCount:1}},EPUBJS.Pagination=function(a){this.pages=[],this.locations=[],this.epubcfi=new EPUBJS.EpubCFI,a&&a.length&&this.process(a)},EPUBJS.Pagination.prototype.process=function(a){a.forEach(function(a){this.pages.push(a.page),this.locations.push(a.cfi)},this),this.pageList=a,this.firstPage=parseInt(this.pages[0]),this.lastPage=parseInt(this.pages[this.pages.length-1]),this.totalPages=this.lastPage-this.firstPage},EPUBJS.Pagination.prototype.pageFromCfi=function(a){var b=-1;if(0===this.locations.length)return-1;var c=EPUBJS.core.indexOfSorted(a,this.locations,this.epubcfi.compare);return-1!=c&&c<this.pages.length-1?b=this.pages[c]:(c=EPUBJS.core.locationOf(a,this.locations,this.epubcfi.compare),b=c-1>=0?this.pages[c-1]:this.pages[0],b=this.pages[c],void 0!==b||(b=-1)),b},EPUBJS.Pagination.prototype.cfiFromPage=function(a){var b=-1;"number"!=typeof a&&(a=parseInt(a));var c=this.pages.indexOf(a);return-1!=c&&(b=this.locations[c]),b},EPUBJS.Pagination.prototype.pageFromPercentage=function(a){var b=Math.round(this.totalPages*a);return b},EPUBJS.Pagination.prototype.percentageFromPage=function(a){var b=(a-this.firstPage)/this.totalPages;return Math.round(1e3*b)/1e3},EPUBJS.Pagination.prototype.percentageFromCfi=function(a){var b=this.pageFromCfi(a),c=this.percentageFromPage(b);return c},EPUBJS.Parser=function(a){this.baseUrl=a||""},EPUBJS.Parser.prototype.container=function(a){var b,c,d,e;return a?(b=a.querySelector("rootfile"))?(c=b.getAttribute("full-path"),d=EPUBJS.core.uri(c).directory,e=a.xmlEncoding,{packagePath:c,basePath:d,encoding:e}):void console.error("No RootFile Found"):void console.error("Container File Not Found")},EPUBJS.Parser.prototype.identifier=function(a){var b;return a?(b=a.querySelector("metadata"),b?this.getElementText(b,"identifier"):void console.error("No Metadata Found")):void console.error("Package File Not Found")},EPUBJS.Parser.prototype.packageContents=function(a,b){var c,d,e,f,g,h,i,j,k,l,m=this;return b&&(this.baseUrl=b),a?(c=a.querySelector("metadata"))?(d=a.querySelector("manifest"))?(e=a.querySelector("spine"))?(f=m.manifest(d),g=m.findNavPath(d),h=m.findTocPath(d),i=m.findCoverPath(d),j=Array.prototype.indexOf.call(e.parentNode.childNodes,e),k=m.spine(e,f),l={},k.forEach(function(a){l[a.href]=a.index
}),{metadata:m.metadata(c),spine:k,manifest:f,navPath:g,tocPath:h,coverPath:i,spineNodeIndex:j,spineIndexByURL:l}):void console.error("No Spine Found"):void console.error("No Manifest Found"):void console.error("No Metadata Found"):void console.error("Package File Not Found")},EPUBJS.Parser.prototype.findNavPath=function(a){var b=a.querySelector("item[properties^='nav']");return b?b.getAttribute("href"):!1},EPUBJS.Parser.prototype.findTocPath=function(a){var b=a.querySelector("item[media-type='application/x-dtbncx+xml']");return b?b.getAttribute("href"):!1},EPUBJS.Parser.prototype.findCoverPath=function(a){var b=a.querySelector("item[properties='cover-image']");return b?b.getAttribute("href"):!1},EPUBJS.Parser.prototype.metadata=function(a){var b={},c=this;return b.bookTitle=c.getElementText(a,"title"),b.creator=c.getElementText(a,"creator"),b.description=c.getElementText(a,"description"),b.pubdate=c.getElementText(a,"date"),b.publisher=c.getElementText(a,"publisher"),b.identifier=c.getElementText(a,"identifier"),b.language=c.getElementText(a,"language"),b.rights=c.getElementText(a,"rights"),b.modified_date=c.querySelectorText(a,"meta[property='dcterms:modified']"),b.layout=c.querySelectorText(a,"meta[property='rendition:layout']"),b.orientation=c.querySelectorText(a,"meta[property='rendition:orientation']"),b.spread=c.querySelectorText(a,"meta[property='rendition:spread']"),b},EPUBJS.Parser.prototype.getElementText=function(a,b){var c,d=a.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/",b);return d&&0!==d.length?(c=d[0],c.childNodes.length?c.childNodes[0].nodeValue:""):""},EPUBJS.Parser.prototype.querySelectorText=function(a,b){var c=a.querySelector(b);return c&&c.childNodes.length?c.childNodes[0].nodeValue:""},EPUBJS.Parser.prototype.manifest=function(a){var b=this.baseUrl,c={},d=a.querySelectorAll("item"),e=Array.prototype.slice.call(d);return e.forEach(function(a){var d=a.getAttribute("id"),e=a.getAttribute("href")||"",f=a.getAttribute("media-type")||"",g=a.getAttribute("properties")||"";c[d]={href:e,url:b+e,type:f,properties:g}}),c},EPUBJS.Parser.prototype.spine=function(a,b){var c=[],d=a.getElementsByTagName("itemref"),e=Array.prototype.slice.call(d),f=Array.prototype.indexOf.call(a.parentNode.childNodes,a),g=new EPUBJS.EpubCFI;return e.forEach(function(a,d){var e=a.getAttribute("idref"),h=g.generateChapterComponent(f,d,e),i=a.getAttribute("properties")||"",j=i.length?i.split(" "):[],k=b[e].properties,l=k.length?k.split(" "):[],m={id:e,linear:a.getAttribute("linear")||"",properties:j,manifestProperties:l,href:b[e].href,url:b[e].url,index:d,cfiBase:h,cfi:"epub("+h+")"};c.push(m)}),c},EPUBJS.Parser.prototype.nav=function(a,b,c){function d(a){var b=[];return Array.prototype.slice.call(a.childNodes).forEach(function(a){"ol"==a.tagName&&Array.prototype.slice.call(a.childNodes).forEach(function(a){"li"==a.tagName&&b.push(a)})}),b}function e(a){var b=null;return Array.prototype.slice.call(a.childNodes).forEach(function(a){("a"==a.tagName||"span"==a.tagName)&&(b=a)}),b}function f(a){var g=[],i=d(a),j=Array.prototype.slice.call(i),k=j.length;return 0===k?!1:(j.forEach(function(d){var i=d.getAttribute("id")||!1,j=e(d),k=j.getAttribute("href")||"",l=j.textContent||"",m=k.split("#"),n=m[0],o=f(d),p=b[n],q=c[p],r=q?q.cfi:"";i||(p?(q=c[p],i=q.id,r=q.cfi):i="epubjs-autogen-toc-id-"+h++),d.setAttribute("id",i),g.push({id:i,href:k,label:l,subitems:o,parent:a?a.getAttribute("id"):null,cfi:r})}),g)}var g=a.querySelector('nav[*|type="toc"]'),h=0;return g?f(g):[]},EPUBJS.Parser.prototype.toc=function(a,b,c){function d(a){var e=[],f=a.querySelectorAll("navPoint"),g=Array.prototype.slice.call(f).reverse(),h=g.length;return 0===h?[]:(g.forEach(function(f){var g=f.getAttribute("id")||!1,h=f.querySelector("content"),i=h.getAttribute("src"),j=f.querySelector("navLabel"),k=j.textContent?j.textContent:"",l=i.split("#"),m=l[0],n=b[m],o=c[n],p=d(f),q=o?o.cfi:"";g||(n?(o=c[n],g=o.id,q=o.cfi):g="epubjs-autogen-toc-id-"+idCounter++),e.unshift({id:g,href:i,label:k,spinePos:n,subitems:p,parent:a?a.getAttribute("id"):null,cfi:q})}),e)}var e=a.querySelector("navMap");return e?d(e):[]},EPUBJS.Parser.prototype.pageList=function(a){function b(a){var b=[];return Array.prototype.slice.call(a.childNodes).forEach(function(a){"ol"==a.tagName&&Array.prototype.slice.call(a.childNodes).forEach(function(a){"li"==a.tagName&&b.push(a)})}),b}function c(a){var b=null;return Array.prototype.slice.call(a.childNodes).forEach(function(a){("a"==a.tagName||"span"==a.tagName)&&(b=a)}),b}function d(a){var d=[],e=b(a),f=Array.prototype.slice.call(e),g=f.length;return 0===g?!1:(f.forEach(function(a){var b,e,f,g=(a.getAttribute("id")||!1,c(a)),h=g.getAttribute("href")||"",i=g.textContent||"",j=parseInt(i),k=h.indexOf("epubcfi");-1!=k?(b=h.split("#"),e=b[0],f=b.length>1?b[1]:!1,d.push({cfi:f,href:h,packageUrl:e,page:j})):d.push({href:h,page:j})}),d)}var e=a.querySelector('nav[*|type="page-list"]');return e?d(e):[]},EPUBJS.Render.Iframe=function(){this.iframe=null,this.document=null,this.window=null,this.docEl=null,this.bodyEl=null,this.leftPos=0,this.pageWidth=0},EPUBJS.Render.Iframe.prototype.create=function(){return this.iframe=document.createElement("iframe"),this.iframe.id="epubjs-iframe:"+EPUBJS.core.uuid(),this.iframe.scrolling="no",this.iframe.seamless="seamless",this.iframe.style.border="none",this.iframe.addEventListener("load",this.loaded.bind(this),!1),this.iframe},EPUBJS.Render.Iframe.prototype.load=function(a){var b=this,c=new RSVP.defer;return this.iframe.contentWindow.location.replace(a),b.leftPos=0,this.window&&this.unload(),this.iframe.onload=function(){b.document=b.iframe.contentDocument,b.docEl=b.document.documentElement,b.headEl=b.document.head,b.bodyEl=b.document.body,b.window=b.iframe.contentWindow,b.window.addEventListener("resize",b.resized.bind(b),!1),b.bodyEl&&(b.bodyEl.style.margin="0"),c.resolve(b.docEl)},this.iframe.onerror=function(a){c.reject({message:"Error Loading Contents: "+a,stack:(new Error).stack})},c.promise},EPUBJS.Render.Iframe.prototype.loaded=function(){var a=this.iframe.contentWindow.location.href;"about:blank"!=a&&this.trigger("render:loaded",a)},EPUBJS.Render.Iframe.prototype.resize=function(a,b){this.iframe&&(this.iframe.height=b,isNaN(a)||a%2===0||(a+=1),this.iframe.width=a,this.width=this.iframe.getBoundingClientRect().width||a,this.height=this.iframe.getBoundingClientRect().height||b)},EPUBJS.Render.Iframe.prototype.resized=function(){this.width=this.iframe.getBoundingClientRect().width,this.height=this.iframe.getBoundingClientRect().height},EPUBJS.Render.Iframe.prototype.totalWidth=function(){return this.docEl.scrollWidth},EPUBJS.Render.Iframe.prototype.totalHeight=function(){return this.docEl.scrollHeight},EPUBJS.Render.Iframe.prototype.setPageDimensions=function(a,b){this.pageWidth=a,this.pageHeight=b},EPUBJS.Render.Iframe.prototype.setLeft=function(a){this.document.defaultView.scrollTo(a,0)},EPUBJS.Render.Iframe.prototype.setStyle=function(a,b,c){c&&(a=EPUBJS.core.prefixed(a)),this.bodyEl&&(this.bodyEl.style[a]=b)},EPUBJS.Render.Iframe.prototype.removeStyle=function(a){this.bodyEl&&(this.bodyEl.style[a]="")},EPUBJS.Render.Iframe.prototype.addHeadTag=function(a,b){var c=document.createElement(a);for(var d in b)c[d]=b[d];this.headEl&&this.headEl.appendChild(c)},EPUBJS.Render.Iframe.prototype.page=function(a){this.leftPos=this.pageWidth*(a-1),this.setLeft(this.leftPos)},EPUBJS.Render.Iframe.prototype.getPageNumberByElement=function(a){var b,c;if(a)return b=this.leftPos+a.getBoundingClientRect().left,c=Math.floor(b/this.pageWidth)+1},EPUBJS.Render.Iframe.prototype.getPageNumberByRect=function(a){var b,c;return b=this.leftPos+a.left,c=Math.floor(b/this.pageWidth)+1},EPUBJS.Render.Iframe.prototype.getBaseElement=function(){return this.bodyEl},EPUBJS.Render.Iframe.prototype.isElementVisible=function(a){var b,c;return a&&"function"==typeof a.getBoundingClientRect&&(b=a.getBoundingClientRect(),c=b.left,0!==b.width&&0!==b.height&&c>=0&&c<this.pageWidth)?!0:!1},EPUBJS.Render.Iframe.prototype.scroll=function(a){this.iframe.scrolling=a?"yes":"no"},EPUBJS.Render.Iframe.prototype.unload=function(){this.window.removeEventListener("resize",this.resized)},RSVP.EventTarget.mixin(EPUBJS.Render.Iframe.prototype),EPUBJS.Renderer=function(a,b){this.listenedEvents=["keydown","keyup","keypressed","mouseup","mousedown","click"],this.upEvent="mouseup",this.downEvent="mousedown","ontouchstart"in document.documentElement&&(this.listenedEvents.push("touchstart","touchend"),this.upEvent="touchend",this.downEvent="touchstart"),a&&"undefined"!=typeof EPUBJS.Render[a]?this.render=new EPUBJS.Render[a]:console.error("Not a Valid Rendering Method"),this.render.on("render:loaded",this.loaded.bind(this)),this.caches={},this.epubcfi=new EPUBJS.EpubCFI,this.spreads=!0,this.isForcedSingle=!1,this.resized=_.debounce(this.onResized.bind(this),100),this.layoutSettings={},this.hidden=b||!1,EPUBJS.Hooks.mixin(this),this.getHooks("beforeChapterDisplay"),this._q=EPUBJS.core.queue(this),this._moving=!1},EPUBJS.Renderer.prototype.Events=["renderer:keydown","renderer:keyup","renderer:keypressed","renderer:mouseup","renderer:mousedown","renderer:click","renderer:touchstart","renderer:touchend","renderer:selected","renderer:chapterUnloaded","renderer:chapterDisplayed","renderer:locationChanged","renderer:visibleLocationChanged","renderer:resized","renderer:spreads"],EPUBJS.Renderer.prototype.initialize=function(a,b,c){this.container=a,this.element=this.render.create(),this.initWidth=b,this.initHeight=c,this.width=b||this.container.clientWidth,this.height=c||this.container.clientHeight,this.container.appendChild(this.element),b&&c?this.render.resize(this.width,this.height):this.render.resize("100%","100%")},EPUBJS.Renderer.prototype.displayChapter=function(a,b){return this._moving?void console.error("Rendering In Progress"):(this._moving=!0,a.url().then(function(c){return this.currentChapter&&(this.currentChapter.unload(),this.render.window&&this.render.window.removeEventListener("resize",this.resized),this.removeEventListeners(),this.removeSelectionListeners(),this.trigger("renderer:chapterUnloaded"),this.contents=null,this.doc=null,this.pageMap=null),this.currentChapter=a,this.chapterPos=1,this.currentChapterCfiBase=a.cfiBase,this.layoutSettings=this.reconcileLayoutSettings(b,a.properties),this.load(c)}.bind(this)))},EPUBJS.Renderer.prototype.load=function(a){var b=new RSVP.defer;return this.layoutMethod=this.determineLayout(this.layoutSettings),this.layout=new EPUBJS.Layout[this.layoutMethod],this.visible(!1),render=this.render.load(a),render.then(function(a){this.currentChapter.contents=this.render.document,this.contents=a,this.doc=this.render.document,this.formated=this.layout.format(a,this.render.width,this.render.height,this.gap),this.render.setPageDimensions(this.formated.pageWidth,this.formated.pageHeight),this.initWidth||this.initHeight||this.render.window.addEventListener("resize",this.resized,!1),this.addEventListeners(),this.addSelectionListeners(),this.beforeDisplay(function(){var a=this.layout.calculatePages(),c=this.currentChapter,d=this._q.length();this._moving=!1,this.updatePages(a),this.visibleRangeCfi=this.getVisibleRangeCfi(),this.currentLocationCfi=this.visibleRangeCfi.start,0===d&&(this.trigger("renderer:locationChanged",this.currentLocationCfi),this.trigger("renderer:visibleRangeChanged",this.visibleRangeCfi)),c.cfi=this.currentLocationCfi,this.trigger("renderer:chapterDisplayed",c),this.visible(!0),b.resolve(this)}.bind(this))}.bind(this)),b.promise},EPUBJS.Renderer.prototype.loaded=function(a){this.trigger("render:loaded",a)},EPUBJS.Renderer.prototype.reconcileLayoutSettings=function(a,b){var c={};for(var d in a)a.hasOwnProperty(d)&&(c[d]=a[d]);return b.forEach(function(a){var b,d,e=a.replace("rendition:",""),f=e.indexOf("-");-1!=f&&(b=e.slice(0,f),d=e.slice(f+1),c[b]=d)}),c},EPUBJS.Renderer.prototype.determineLayout=function(a){var b=this.determineSpreads(this.minSpreadWidth),c=b?"ReflowableSpreads":"Reflowable",d=!1;return"pre-paginated"===a.layout&&(c="Fixed",d=!0,b=!1),"reflowable"===a.layout&&"none"===a.spread&&(c="Reflowable",d=!1,b=!1),"reflowable"===a.layout&&"both"===a.spread&&(c="ReflowableSpreads",d=!1,b=!0),this.spreads=b,this.render.scroll(d),this.trigger("renderer:spreads",b),c},EPUBJS.Renderer.prototype.beforeDisplay=function(a){this.triggerHooks("beforeChapterDisplay",a,this)},EPUBJS.Renderer.prototype.updatePages=function(){this.pageMap=this.mapPage(),this.displayedPages=this.spreads?Math.ceil(this.pageMap.length/2):this.pageMap.length,this.currentChapter.pages=this.pageMap.length,this._q.flush()},EPUBJS.Renderer.prototype.reformat=function(){var a,b=this;this.contents&&(spreads=this.determineSpreads(this.minSpreadWidth),spreads!=this.spreads&&(this.spreads=spreads,this.layoutMethod=this.determineLayout(this.layoutSettings),this.layout=new EPUBJS.Layout[this.layoutMethod]),this.formated=this.layout.format(this.contents,this.render.width,this.render.height,this.gap),this.render.setPageDimensions(this.formated.pageWidth,this.formated.pageHeight),a=b.layout.calculatePages(),b.updatePages(a),clearTimeout(this.timeoutTillCfi),this.timeoutTillCfi=setTimeout(function(){b.currentLocationCfi&&b.gotoCfi(b.currentLocationCfi),this.timeoutTillCfi=null},10))},EPUBJS.Renderer.prototype.visible=function(a){return"undefined"==typeof a?this.element.style.visibility:void(a!==!0||this.hidden?a===!1&&(this.element.style.visibility="hidden"):this.element.style.visibility="visible")},EPUBJS.Renderer.prototype.remove=function(){this.render.window&&(this.render.unload(),this.render.window.removeEventListener("resize",this.resized),this.removeEventListeners(),this.removeSelectionListeners()),this.container.removeChild(this.element)},EPUBJS.Renderer.prototype.applyStyles=function(a){for(var b in a)this.render.setStyle(b,a[b])},EPUBJS.Renderer.prototype.setStyle=function(a,b,c){this.render.setStyle(a,b,c)},EPUBJS.Renderer.prototype.removeStyle=function(a){this.render.removeStyle(a)},EPUBJS.Renderer.prototype.applyHeadTags=function(a){for(var b in a)this.render.addHeadTag(b,a[b])},EPUBJS.Renderer.prototype.page=function(a){return this.pageMap?a>=1&&a<=this.displayedPages?(this.chapterPos=a,this.render.page(a),this.visibleRangeCfi=this.getVisibleRangeCfi(),this.currentLocationCfi=this.visibleRangeCfi.start,this.trigger("renderer:locationChanged",this.currentLocationCfi),this.trigger("renderer:visibleRangeChanged",this.visibleRangeCfi),!0):!1:(console.warn("pageMap not set, queuing"),this._q.enqueue("page",arguments),!0)},EPUBJS.Renderer.prototype.nextPage=function(){return this.page(this.chapterPos+1)},EPUBJS.Renderer.prototype.prevPage=function(){return this.page(this.chapterPos-1)},EPUBJS.Renderer.prototype.pageByElement=function(a){var b;a&&(b=this.render.getPageNumberByElement(a),this.page(b))},EPUBJS.Renderer.prototype.lastPage=function(){return this._moving?this._q.enqueue("lastPage",arguments):void this.page(this.displayedPages)},EPUBJS.Renderer.prototype.firstPage=function(){this.page(1)},EPUBJS.Renderer.prototype.section=function(a){var b=this.doc.getElementById(a);b&&this.pageByElement(b)},EPUBJS.Renderer.prototype.firstElementisTextNode=function(a){var b=a.childNodes,c=b.length;return c&&b[0]&&3===b[0].nodeType&&b[0].textContent.trim().length?!0:!1},EPUBJS.Renderer.prototype.walk=function(a,b,c){for(var d,e,f,g,h=a,i=[h],j=1e4,k=0;!d&&i.length;){if(a=i.shift(),this.containsPoint(a,b,c)&&this.firstElementisTextNode(a)&&(d=a),!d&&a&&a.childElementCount>0){if(e=a.children,!e||!e.length)return d;f=e.length?e.length:0;for(var l=f-1;l>=0;l--)e[l]!=g&&i.unshift(e[l])}if(!d&&0===i.length&&h&&null!==h.parentNode&&(i.push(h.parentNode),g=h,h=h.parentNode),k++,k>j){console.error("ENDLESS LOOP");break}}return d},EPUBJS.Renderer.prototype.containsPoint=function(a,b){var c;return a&&"function"==typeof a.getBoundingClientRect&&(c=a.getBoundingClientRect(),0!==c.width&&0!==c.height&&c.left>=b&&b<=c.left+c.width)?!0:!1},EPUBJS.Renderer.prototype.textSprint=function(a,b){for(var c,d=document.createTreeWalker(a,NodeFilter.SHOW_TEXT,{acceptNode:function(a){return/^\s*$/.test(a.data)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}},!1);c=d.nextNode();)b(c)},EPUBJS.Renderer.prototype.sprint=function(a,b){for(var c,d=document.createTreeWalker(a,NodeFilter.SHOW_ELEMENT,null,!1);c=d.nextNode();)b(c)},EPUBJS.Renderer.prototype.mapPage=function(){var a,b,c=this,d=[{start:null,end:null}],e=this.render.getBaseElement(),f=1,g=this.layout.colWidth+this.layout.gap,h=this.formated.pageWidth*(this.chapterPos-1),i=g*f-h,j=0,k=function(a){var b,c,d=Array.prototype.slice.call(a.childNodes);if(a.nodeType==Node.ELEMENT_NODE){if(c=document.createRange(),c.selectNodeContents(a),b=c.getBoundingClientRect(),!b||0===b.width&&0===b.height)return;b.left>j&&d.forEach(function(a){a.nodeType==Node.TEXT_NODE&&a.textContent.trim().length&&l(a)}),b.right>j&&d.forEach(function(a){a.nodeType==Node.TEXT_NODE&&a.textContent.trim().length&&l(a)})}},l=function(e){var k=c.splitTextNodeIntoWordsRanges(e);k.forEach(function(e){var k=e.getBoundingClientRect();!k||0===k.width&&0===k.height||(k.left+k.width<i?d[f-1].start||(e.collapse(!0),b=c.currentChapter.cfiFromRange(e),d[f-1].start=b):(a&&(a.collapse(!0),b=c.currentChapter.cfiFromRange(a),d[f-1].end=b),e.collapse(!0),b=c.currentChapter.cfiFromRange(e),d.push({start:b,end:null}),f+=1,i=g*f-h,j=i),a=e)})};return this.sprint(e,k),a&&(a.collapse(!0),b=c.currentChapter.cfiFromRange(a),d[f-1].end=b),1!==d.length||d[0].start||(range=this.doc.createRange(),range.selectNodeContents(e),range.collapse(!0),b=c.currentChapter.cfiFromRange(range),d[0].start=b,d[0].end=b),a=null,ranges=null,range=null,e=null,d},EPUBJS.Renderer.prototype.splitTextNodeIntoWordsRanges=function(a){var b,c=[],d=a.textContent.trim();if(pos=d.indexOf(" "),-1===pos)return b=this.doc.createRange(),b.selectNodeContents(a),[b];for(b=this.doc.createRange(),b.setStart(a,0),b.setEnd(a,pos),c.push(b),b=!1;-1!=pos;)pos=d.indexOf(" ",pos+1),pos>0&&(b&&(b.setEnd(a,pos),c.push(b)),b=this.doc.createRange(),b.setStart(a,pos+1));return b&&(b.setEnd(a,d.length),c.push(b)),c},EPUBJS.Renderer.prototype.rangePosition=function(a){var b,c;return c=a.getClientRects(),c.length?b=c[0]:null},EPUBJS.Renderer.prototype.getPageCfi=function(){var a;return this.spreads?(a=2*this.chapterPos,startRange=this.pageMap[a-2]):(a=this.chapterPos,startRange=this.pageMap[a-1]),this.pageMap[2*this.chapterPos-1].start},EPUBJS.Renderer.prototype.getRange=function(a,b,c){var d,e=this.doc.createRange();return c=!0,"undefined"==typeof document.caretPositionFromPoint||c?"undefined"==typeof document.caretRangeFromPoint||c?(this.visibileEl=this.findElementAfter(a,b),e.setStart(this.visibileEl,1)):e=this.doc.caretRangeFromPoint(a,b):(d=this.doc.caretPositionFromPoint(a,b),e.setStart(d.offsetNode,d.offset)),e},EPUBJS.Renderer.prototype.pagesInCurrentChapter=function(){var a,b;return this.pageMap?(b=this.pageMap.length,a=this.spreads?Math.ceil(b/2):b):(console.warn("page map not loaded"),!1)},EPUBJS.Renderer.prototype.currentRenderedPage=function(){var a;return this.pageMap?a=this.spreads&&this.layout.pageCount>1?2*this.chapterPos:this.chapterPos:(console.warn("page map not loaded"),!1)},EPUBJS.Renderer.prototype.getRenderedPagesLeft=function(){var a,b,c;return this.pageMap?(b=this.pageMap.length,a=this.spreads?2*this.chapterPos:this.chapterPos,c=b-a):(console.warn("page map not loaded"),!1)},EPUBJS.Renderer.prototype.getVisibleRangeCfi=function(){var a,b,c;return this.pageMap?(this.spreads?(a=2*this.chapterPos,b=this.pageMap[a-2],c=b,this.layout.pageCount>1&&(c=this.pageMap[a-1])):(a=this.chapterPos,b=this.pageMap[a-1],c=b),b||(console.warn("page range miss:",a,this.pageMap),b=this.pageMap[this.pageMap.length-1],c=b),{start:b.start,end:c.end}):(console.warn("page map not loaded"),!1)},EPUBJS.Renderer.prototype.gotoCfi=function(a){var b,c,d;return this._moving?this._q.enqueue("gotoCfi",arguments):(_.isString(a)&&(a=this.epubcfi.parse(a)),void("undefined"==typeof document.evaluate?(c=this.epubcfi.addMarker(a,this.doc),c&&(b=this.render.getPageNumberByElement(c),this.epubcfi.removeMarker(c,this.doc),this.page(b))):(d=this.epubcfi.generateRangeFromCfi(a,this.doc),d&&(b=this.render.getPageNumberByRect(d.getBoundingClientRect()),this.page(b)))))},EPUBJS.Renderer.prototype.findFirstVisible=function(a){var b,c=a||this.render.getBaseElement();return b=this.walk(c),b?b:a},EPUBJS.Renderer.prototype.findElementAfter=function(a,b,c){var d,e=c||this.render.getBaseElement();return d=this.walk(e,a,b),d?d:e},EPUBJS.Renderer.prototype.resize=function(a,b,c){this.width=a,this.height=b,c!==!1&&this.render.resize(this.width,this.height),this.contents&&this.reformat(),this.trigger("renderer:resized",{width:this.width,height:this.height})},EPUBJS.Renderer.prototype.onResized=function(){var a=this.container.clientWidth,b=this.container.clientHeight;this.resize(a,b,!1)},EPUBJS.Renderer.prototype.addEventListeners=function(){this.render.document&&this.listenedEvents.forEach(function(a){this.render.document.addEventListener(a,this.triggerEvent.bind(this),!1)},this)},EPUBJS.Renderer.prototype.removeEventListeners=function(){this.render.document&&this.listenedEvents.forEach(function(a){this.render.document.removeEventListener(a,this.triggerEvent,!1)},this)},EPUBJS.Renderer.prototype.triggerEvent=function(a){this.trigger("renderer:"+a.type,a)},EPUBJS.Renderer.prototype.addSelectionListeners=function(){this.render.document.addEventListener("selectionchange",this.onSelectionChange.bind(this),!1)},EPUBJS.Renderer.prototype.removeSelectionListeners=function(){this.render.document&&this.doc.removeEventListener("selectionchange",this.onSelectionChange,!1)},EPUBJS.Renderer.prototype.onSelectionChange=function(){this.selectionEndTimeout&&clearTimeout(this.selectionEndTimeout),this.selectionEndTimeout=setTimeout(function(){this.selectedRange=this.render.window.getSelection(),this.trigger("renderer:selected",this.selectedRange)}.bind(this),500)},EPUBJS.Renderer.prototype.setMinSpreadWidth=function(a){this.minSpreadWidth=a,this.spreads=this.determineSpreads(a)},EPUBJS.Renderer.prototype.determineSpreads=function(a){return this.isForcedSingle||!a||this.width<a?!1:!0},EPUBJS.Renderer.prototype.forceSingle=function(a){this.isForcedSingle=a?!0:!1},EPUBJS.Renderer.prototype.setGap=function(a){this.gap=a},EPUBJS.Renderer.prototype.replace=function(a,b,c,d){var e=this.contents.querySelectorAll(a),f=Array.prototype.slice.call(e),g=f.length;return 0===g?void c(!1):void f.forEach(function(a){var e=!1,f=function(a,b){e===!1&&(g--,d&&d(a,b,g),0>=g&&c&&c(!0),e=!0)};b(a,f)}.bind(this))},EPUBJS.Renderer.prototype.replaceWithStored=function(a,b,c,d){var e,f={},g=this.currentChapter.store,h=this.caches[a],i=EPUBJS.core.uri(this.currentChapter.absolute),j=i.base,k=b,l=2e3,m=function(a,b){f[b]=a},n=function(){d&&d(),_.each(e,function(a){g.revokeUrl(a)}),h=f};g&&(h||(h={}),e=_.clone(h),this.replace(a,function(b,d){var h=b.getAttribute(k),i=EPUBJS.core.resolveUrl(j,h),m=function(c){var e;b.onload=function(){clearTimeout(e),d(c,i)},b.onerror=function(a){clearTimeout(e),d(c,i),console.error(a)},"image"==a&&b.setAttribute("externalResourcesRequired","true"),"link[href]"==a&&"stylesheet"!==b.getAttribute("rel")&&d(c,i),b.setAttribute(k,c),e=setTimeout(function(){d(c,i)},l)};i in e?(m(e[i]),f[i]=e[i],delete e[i]):c(g,i,m,b)},n,m))},RSVP.EventTarget.mixin(EPUBJS.Renderer.prototype);var EPUBJS=EPUBJS||{};EPUBJS.replace={},EPUBJS.replace.hrefs=function(a,b){var c=this,d=function(a,d){var e,f,g=a.getAttribute("href"),h=g.search("://");-1!=h?a.setAttribute("target","_blank"):(e=EPUBJS.core.uri(b.render.window.location.href).directory,f=EPUBJS.core.resolveUrl(e,g),a.onclick=function(){return c.goto(f),!1}),d()};b.replace("a[href]",d,a)},EPUBJS.replace.head=function(a,b){b.replaceWithStored("link[href]","href",EPUBJS.replace.links,a)},EPUBJS.replace.resources=function(a,b){b.replaceWithStored("[src]","src",EPUBJS.replace.srcs,a)},EPUBJS.replace.svg=function(a,b){b.replaceWithStored("image","xlink:href",function(a,b,c){a.getUrl(b).then(c)},a)},EPUBJS.replace.srcs=function(a,b,c){a.getUrl(b).then(c)},EPUBJS.replace.links=function(a,b,c,d){"stylesheet"===d.getAttribute("rel")?EPUBJS.replace.stylesheets(a,b).then(function(a,b){setTimeout(function(){c(a,b)},5)}):a.getUrl(b).then(c)},EPUBJS.replace.stylesheets=function(a,b){var c=new RSVP.defer;if(a)return a.getText(b).then(function(d){EPUBJS.replace.cssUrls(a,b,d).then(function(a){var b=window.URL||window.webkitURL||window.mozURL,d=new Blob([a],{type:"text/css"}),e=b.createObjectURL(d);c.resolve(e)},function(a){console.error(a)})}),c.promise},EPUBJS.replace.cssUrls=function(a,b,c){var d=new RSVP.defer,e=[],f=c.match(/url\(\'?\"?([^\'|^\"^\)]*)\'?\"?\)/g);if(a)return f?(f.forEach(function(d){var f=EPUBJS.core.resolveUrl(b,d.replace(/url\(|[|\)|\'|\"]/g,"")),g=a.getUrl(f).then(function(a){c=c.replace(d,'url("'+a+'")')});e.push(g)}),RSVP.all(e).then(function(){d.resolve(c)}),d.promise):(d.resolve(c),d.promise)},EPUBJS.Unarchiver=function(a){return this.libPath=EPUBJS.filePath,this.zipUrl=a,this.loadLib(),this.urlCache={},this.zipFs=new zip.fs.FS,this.promise},EPUBJS.Unarchiver.prototype.loadLib=function(){"undefined"==typeof zip&&console.error("Zip lib not loaded"),zip.workerScriptsPath=this.libPath},EPUBJS.Unarchiver.prototype.openZip=function(a){var b=new RSVP.defer,c=this.zipFs;return c.importHttpContent(a,!1,function(){b.resolve(c)},this.failed),b.promise},EPUBJS.Unarchiver.prototype.getXml=function(a,b){return this.getText(a,b).then(function(a){var b=new DOMParser;return b.parseFromString(a,"application/xml")})},EPUBJS.Unarchiver.prototype.getUrl=function(a,b){var c=this,d=new RSVP.defer,e=window.decodeURIComponent(a),f=this.zipFs.find(e),g=window.URL||window.webkitURL||window.mozURL;return f?a in this.urlCache?(d.resolve(this.urlCache[a]),d.promise):(f.getBlob(b||zip.getMimeType(f.name),function(b){var e=g.createObjectURL(b);d.resolve(e),c.urlCache[a]=e}),d.promise):(d.reject({message:"File not found in the epub: "+a,stack:(new Error).stack}),d.promise)},EPUBJS.Unarchiver.prototype.getText=function(a,b){{var c=new RSVP.defer,d=window.decodeURIComponent(a),e=this.zipFs.find(d);window.URL||window.webkitURL||window.mozURL}return e?(e.getText(function(a){c.resolve(a)},null,null,b||"UTF-8"),c.promise):(console.warn("File not found in the contained epub:",a),c.promise)},EPUBJS.Unarchiver.prototype.revokeUrl=function(a){var b=window.URL||window.webkitURL||window.mozURL,c=unarchiver.urlCache[a];c&&b.revokeObjectURL(c)},EPUBJS.Unarchiver.prototype.failed=function(a){console.error(a)},EPUBJS.Unarchiver.prototype.afterSaved=function(){this.callback()},EPUBJS.Unarchiver.prototype.toStorage=function(a){function b(){f--,0===f&&e.afterSaved()}var c=0,d=20,e=this,f=a.length;a.forEach(function(a){setTimeout(function(a){e.saveEntryFileToStorage(a,b)},c,a),c+=d}),console.log("time",c)},EPUBJS.Unarchiver.prototype.saveEntryFileToStorage=function(a,b){a.getData(new zip.BlobWriter,function(c){EPUBJS.storage.save(a.filename,c,b)})};
//# sourceMappingURL=epub.min.map
;
/*! fileStorage - v0.1.0 - 2013-03-28 */
var fileStorage = fileStorage || {};
fileStorage.core=fileStorage.core||{},fileStorage.core.dataURLToBlob=function(e){var t=";base64,";if(e.indexOf(t)==-1){var n=e.split(","),r=n[0].split(":")[1],i=n[1];return new Blob([i],{type:r})}var n=e.split(t),r=n[0].split(":")[1],i=window.atob(n[1]),s=i.length,o=new Uint8Array(s);for(var u=0;u<s;++u)o[u]=i.charCodeAt(u);return new Blob([o],{type:r})},fileStorage.core.loadFile=function(e,t,n){var r=new XMLHttpRequest;return this.succeeded=function(e){t&&t(e)},this.failed=function(e){console.log("Error:",e)},this.start=function(){var t=this;r.open("GET",e,!0),r.responseType="blob",r.onload=function(e){this.status==200&&t.succeeded(this.response)},r.onerror=function(e){t.failed(this.status)},r.send()},{start:this.start,succeeded:this.succeeded,failed:this.failed}},fileStorage.Queue=function(e,t){this._q=[],this._tasks={},this.idCount=0,this.concurrency=0,this.workers=[],this.available=[],typeof e=="string"&&(this.workerStr=e,this.addWorkers(t||1)),typeof e=="function"&&(this.workerFunction=e,this.addFakeWorkers(t||1))},fileStorage.Queue.prototype.addWorkers=function(e){var t=this.concurrency,n=t+e;for(var r=t;r<e;r++){var i=new Worker(this.workerStr);this.workers.push(i),this.available.push(r)}this.concurrency=e},fileStorage.Queue.prototype.addFakeWorkers=function(e){var t=this.concurrency,n=t+e;for(var r=t;r<e;r++){var i=new fileStorage.FakeWorker(this.workerFunction);this.workers.push(i),this.available.push(r)}this.concurrency=e},fileStorage.Queue.prototype.add=function(e,t,n){var r=this.idCount;return this._tasks[r]={msg:e,callback:t||function(){}},n?(this._q.unshift(r),this.running||this.run()):this._q.push(r),this.idCount++,r},fileStorage.Queue.prototype.addGroup=function(e,t){var n=this,r=e.length,i=function(){r--,r<=0&&t()};return e.forEach(function(e){n.add(e,i)}),this.running||this.run(),i},fileStorage.Queue.prototype.run=function(e){if(this.running)return;this.running=!0;while(this.available.length){var t=this.next();if(!t)break}},fileStorage.Queue.prototype.find=function(e){},fileStorage.Queue.prototype.next=function(){var e=this,t=this._q.shift(),n,r,i;return typeof t=="undefined"?(this.running=!1,!1):(n=this._tasks[t],r=this.available.pop(),i=this.workers[r],i.postMessage(n.msg),i.onmessage=function(i){var s=i.data;n.callback(s),delete e._tasks[t],e.available.push(r),e.next()},i)},fileStorage.Queue.prototype.empty=function(){this._q=[],this._tasks={}},fileStorage.FakeWorker=function(e){this.func=e},fileStorage.FakeWorker.prototype.postMessage=function(e){setTimeout(function(){this.func(e,this.onmessage)}.bind(this),1)},fileStorage.FakeWorker.prototype.onmessage=function(e){},fileStorage.FakeWorker.prototype.close=function(e){},fileStorage.storage=function(e){return this._supported={},this._storageType=!1,this._store=!1,this.determineStorageMethod(e),this},fileStorage.storage.prototype.storageMethod=function(e){console.log("storageMethod",e),!e||typeof fileStorage.store[e]=="undefined"?this._storageType="none":this._storageType=e,this._store=new fileStorage.store[this._storageType],this._store.failed=this._error},fileStorage.storage.prototype.determineStorageMethod=function(e){var t=["filesystem","indexeddb","websql","ram"],n="none";this.checkSupport();if(e&&(e=="none"||this._supported[e]))n=e;else for(var r=-1,i=t.length;++r<i;)if(this._supported[t[r]]){n=t[r];break}this.storageMethod(n)},fileStorage.storage.prototype.get=function(e,t){return this._store.get(e,t)},fileStorage.storage.prototype.batch=function(e,t){return this._store.batch(e,t)},fileStorage.storage.prototype.getURL=function(e){return this._store.getURL(e)},fileStorage.storage.prototype.save=function(e,t,n){return this._store.save(e,t,n)},fileStorage.storage.prototype._error=function(e){console.log("error",e)},fileStorage.storage.prototype.getStorageType=function(){return this._storageType},fileStorage.storage.prototype.checkSupport=function(){var e="filesystem indexeddb websql ram".split(" "),t="RequestFileSystem IndexedDB openDatabase URL".split(" ");for(var n=-1,r=e.length;++n<r;){var i=e[n],s=t[n];this._supported[i]=this.testSupport(s)}},fileStorage.storage.prototype.testSupport=function(e){prefixes=["webkit","moz","o","ms"];for(var t=-1,n=prefixes.length;++t<n;)if(window[prefixes[t]+e])return!0;return e in window},fileStorage.store=fileStorage.store||{},fileStorage.store.filesystem=function(){function o(e){if(r){e(r);return}n(s,i,function(t){r=t,e(t)},v)}function u(e){}function a(e,n){t.addGroup(e,n)}function f(n,r){if(typeof e[n]!="undefined")return e[n];l(n,function(e){var i;e?(i=d(n,e),typeof r!="undefined"&&r(i)):t.add(n,function(e){l(e,function(t){e=d(n,t),typeof r!="undefined"&&r(e)})},!0)})}function l(e,t){var n,r;o(function(n){n.root.getFile(e,{},function(e){t(e)},function(){t(!1)})})}function c(e,t){var n=new fileStorage.core.loadFile(e);n.succeeded=function(e){typeof t!="undefined"&&t(e)},n.failed=v,n.start()}function h(e,t,n){o(function(r){var i=e.split("/").slice(0,-1);p(r.root,i),r.root.getFile(e,{create:!0},function(e){e.createWriter(function(e){e.onwriteend=function(e){n&&n(e)},e.onerror=function(e){v(err)},e.write(t)})},v)})}function p(e,t){if(t[0]=="."||t[0]=="")t=t.slice(1);e.getDirectory(t[0],{create:!0},function(e){t.length&&p(e,t.slice(1))},v)}function d(t,n){var r;return typeof e[t]!="undefined"?e[t]:(r=n.toURL(),e[t]=r,r)}function v(e){typeof this.failed=="undefined"?console.log("Error: ",m(e)):this.failed(e)}function m(e){switch(e.code){case FileError.QUOTA_EXCEEDED_ERR:return"QUOTA_EXCEEDED_ERR";case FileError.NOT_FOUND_ERR:return"NOT_FOUND_ERR";case FileError.SECURITY_ERR:return"SECURITY_ERR";case FileError.INVALID_MODIFICATION_ERR:return"INVALID_MODIFICATION_ERR";case FileError.INVALID_STATE_ERR:return"INVALID_STATE_ERR";case FileError.TYPE_MISMATCH_ERR:return"TYPE_MISMATCH_ERR";default:return"Unknown Error:"+e.code}}var e={},t=new fileStorage.Queue((fileStorage.filePath||"")+"loader_filesystem.js",6),n=window.requestFileSystem||window.webkitRequestFileSystem,r;const i=5242880,s=TEMPORARY;return{get:f,preload:u,batch:a,getURL:d,save:h}},fileStorage.store=fileStorage.store||{},fileStorage.store.indexeddb=function(){function u(e,t){var n={data:null},r=e;p(e,function(e){d(r,e),t(n)})}function a(e){var t;if(i){e(i);return}t=indexedDB.open(o),t.onsuccess=function(n){i=t.result,i.onerror=function(e){console.log("Database error: "+e.target.errorCode)},e&&e(i)},t.onerror=function(e){},t.onupgradeneeded=function(e){var t=e.target.result,n=t.createObjectStore("files",{keyPath:"path"})}}function f(e){}function l(e,t){n.addGroup(e,t)}function c(e,r){if(typeof t[e]!="undefined"){r(t[e]);return}h(e,function(t){var i;t?(i=v(e,t),typeof r!="undefined"&&r(i)):n.add(e,function(t){i=v(e,t),typeof r!="undefined"&&r(i)},!0)})}function h(e,t){var n,r;a(function(i){r=i.transaction(["files"]).objectStore("files"),n=r.get(e),n.onerror=function(e){console.log("error:",e),t(!1)},n.onsuccess=function(r){var i=n.result.file;i?t(i):console.log("File not found",e)}})}function p(e,t){var n=new fileStorage.core.loadFile(e);n.succeeded=function(e){typeof t!="undefined"&&t(e)},n.failed=m,n.start()}function d(e,t){var n={path:e,file:t},r;a(function(e){var t=e.transaction(["files"],"readwrite"),i=t.objectStore("files");r=i.put(n),r.onerror=function(e){console.log("failed: "+e.target.errorCode)},r.onsuccess=function(e){}})}function v(e,n){var r;if(typeof t[e]!="undefined"){callback(t[e]);return}return r=s.createObjectURL(n),t[e]=r,r}function m(e){typeof this.failed=="undefined"?console.log("Error: ",e):this.failed(e)}var e={},t={},n=new fileStorage.Queue(u,6),r=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB,i,s=window.URL;const o="fileStorage_db";return{get:c,preload:f,batch:l,getURL:v,save:d}},fileStorage.store=fileStorage.store||{},fileStorage.store.none=function(){function r(e,t){var n={data:null},r=u(e);r?(n.data=r,t(n)):a(e,function(e){n.data=e,t(n)})}function i(e){var t=u(e);t||n.add(e)}function s(e,t){n.addGroup(e,t)}function o(e,t){var r=u(e),i;r?typeof t!="undefined"&&t(r):n.add(e,function(n){typeof t!="undefined"&&t(e)},!0)}function u(t){var n=e[t];return typeof n!="undefined"?n:!1}function a(e,t){var n=new fileStorage.core.loadFile(e);n.succeeded=function(n){f(e,n),typeof t!="undefined"&&t(n)},n.failed=l,n.start()}function f(t,n){if(e[t])return;e[t]=t}function l(e){typeof this.failed=="undefined"?console.log("Error: ",e):this.failed(e)}var e={},t={},n=new fileStorage.Queue(r,6);return{get:o,preload:i,batch:s}},fileStorage.store=fileStorage.store||{},fileStorage.store.ram=function(){function i(e,t){var n={data:null},r=a(e);r?(n.data=r,t(n)):f(e,function(e){n.data=e,t(n)})}function s(e){var t=a(e);t||n.add(e)}function o(e,t){n.addGroup(e,t)}function u(e,t){var r=a(e),i;r?(i=c(e,r),typeof t!="undefined"&&t(i)):n.add(e,function(n){i=c(e,n),typeof t!="undefined"&&t(i)},!0)}function a(t){var n=e[t];return typeof n!="undefined"?n:!1}function f(e,t){var n=new fileStorage.core.loadFile(e);n.succeeded=function(n){l(e,n),typeof t!="undefined"&&t(n)},n.failed=h,n.start()}function l(t,n){if(e[t])return;e[t]=n}function c(e,n){var i;return typeof t[e]!="undefined"?t[e]:(i=r.createObjectURL(n),t[e]=i,i)}function h(e){typeof this.failed=="undefined"?console.log("Error: ",e):this.failed(e)}var e={},t={},n=new fileStorage.Queue(i,6),r=window.URL||window.webkitURL;return{get:u,preload:s,batch:o}},fileStorage.store=fileStorage.store||{},fileStorage.store.websql=function(){function f(e,t){var n={data:null},r=e;v(e,function(e){m(r,e),t(n)})}function l(e){if(n){e(n);return}n=openDatabase(i,s,o,u);if(!n){console.error("Database error");return}n.transaction(function(t){t.executeSql("CREATE TABLE IF NOT EXISTS "+a+" (path TEXT PRIMARY KEY ASC UNIQUE, file BLOB, type TEXT)"),e&&e(n)})}function c(e){}function h(e,n){t.addGroup(e,n)}function p(n,r){if(typeof e[n]!="undefined"){r(e[n]);return}d(n,function(e){var i;e?(i=g(n,e),typeof r!="undefined"&&r(i)):t.add(n,function(e){i=g(n,e),typeof r!="undefined"&&r(i)},!0)})}function d(e,t){var n={};console.log("path",e),n.onError=function(e,n){console.log("get Error",n),t(!1)},n.onSuccess=function(e,n){var r;n.rows.length&&(r=n.rows.item(0),t(r.file))},l(function(t){t.transaction(function(t){t.executeSql("SELECT * FROM "+a+" WHERE path='"+e+"' LIMIT 1",[],n.onSuccess,n.onError)})})}function v(e,t){var n=new fileStorage.core.loadFile(e,!1,"arraybuffer");n.succeeded=function(e){typeof t!="undefined"&&t(e)},n.failed=y,n.start()}function m(e,t){var n={},r=new FileReader,i;t instanceof Blob||console.log("Not blob"),r.onload=function(r){i=r.target.result,l(function(r){r.transaction(function(r){r.executeSql("REPLACE INTO "+a+" (path, file, type) VALUES (?,?,?)",[e,i,t.type],n.onSuccess,n.onError)})})},r.onerror=function(e){console.log("err",e)},r.readAsDataURL(t),n.onError=function(e,t){console.log("failed: ",t)},n.onSuccess=function(t){console.log("saved",e)}}function g(t,n){var i,s;if(typeof e[t]!="undefined"){callback(e[t]);return}return s=fileStorage.core.dataURLToBlob(n),i=r.createObjectURL(s),e[t]=i,i}function y(e){typeof this.failed=="undefined"?console.log("Error: ",e):this.failed(e)}var e={},t=new fileStorage.Queue(f,6),n,r=window.URL||window.webkitURL;const i="fileStoragejs_db",s="1",o="cache for files",u=5242880,a="files";return{get:p,preload:c,batch:h,getURL:g,save:m}};
//# sourceMappingURL=fileStorage.min.js.map
;
/*
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*
 * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
 * JZlib is based on zlib-1.1.3, so all credit should go authors
 * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
 * and contributors of zlib.
 */


(function(obj) {

	// Global
	var MAX_BITS = 15;

	var Z_OK = 0;
	var Z_STREAM_END = 1;
	var Z_NEED_DICT = 2;
	var Z_STREAM_ERROR = -2;
	var Z_DATA_ERROR = -3;
	var Z_MEM_ERROR = -4;
	var Z_BUF_ERROR = -5;

	var inflate_mask = [ 0x00000000, 0x00000001, 0x00000003, 0x00000007, 0x0000000f, 0x0000001f, 0x0000003f, 0x0000007f, 0x000000ff, 0x000001ff, 0x000003ff,
			0x000007ff, 0x00000fff, 0x00001fff, 0x00003fff, 0x00007fff, 0x0000ffff ];

	var MANY = 1440;

	// JZlib version : "1.0.2"
	var Z_NO_FLUSH = 0;
	var Z_FINISH = 4;

	// InfTree
	var fixed_bl = 9;
	var fixed_bd = 5;

	var fixed_tl = [ 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0,
			0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40,
			0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13,
			0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60,
			0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7,
			35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8,
			26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80,
			7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0,
			8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0,
			8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97,
			0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210,
			81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117,
			0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154,
			84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83,
			0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230,
			80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139,
			0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174,
			0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111,
			0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9,
			193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8,
			120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8,
			227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8,
			92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9,
			249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8,
			130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9,
			181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8,
			102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9,
			221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0,
			8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9,
			147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8,
			85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9,
			235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8,
			141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9,
			167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8,
			107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9,
			207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8,
			127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255 ];
	var fixed_td = [ 80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5,
			8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5,
			24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577 ];

	// Tables for deflate from PKZIP's appnote.txt.
	var cplens = [ // Copy lengths for literal codes 257..285
	3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0 ];

	// see note #13 above about 258
	var cplext = [ // Extra bits for literal codes 257..285
	0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112 // 112==invalid
	];

	var cpdist = [ // Copy offsets for distance codes 0..29
	1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577 ];

	var cpdext = [ // Extra bits for distance codes
	0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ];

	// If BMAX needs to be larger than 16, then h and x[] should be uLong.
	var BMAX = 15; // maximum bit length of any code

	function InfTree() {
		var that = this;

		var hn; // hufts used in space
		var v; // work area for huft_build
		var c; // bit length count table
		var r; // table entry for structure assignment
		var u; // table stack
		var x; // bit offsets, then code stack

		function huft_build(b, // code lengths in bits (all assumed <=
		// BMAX)
		bindex, n, // number of codes (assumed <= 288)
		s, // number of simple-valued codes (0..s-1)
		d, // list of base values for non-simple codes
		e, // list of extra bits for non-simple codes
		t, // result: starting table
		m, // maximum lookup bits, returns actual
		hp,// space for trees
		hn,// hufts used in space
		v // working area: values in order of bit length
		) {
			// Given a list of code lengths and a maximum table size, make a set of
			// tables to decode that set of codes. Return Z_OK on success,
			// Z_BUF_ERROR
			// if the given code set is incomplete (the tables are still built in
			// this
			// case), Z_DATA_ERROR if the input is invalid (an over-subscribed set
			// of
			// lengths), or Z_MEM_ERROR if not enough memory.

			var a; // counter for codes of length k
			var f; // i repeats in table every f entries
			var g; // maximum code length
			var h; // table level
			var i; // counter, current code
			var j; // counter
			var k; // number of bits in current code
			var l; // bits per table (returned in m)
			var mask; // (1 << w) - 1, to avoid cc -O bug on HP
			var p; // pointer into c[], b[], or v[]
			var q; // points to current table
			var w; // bits before this table == (l * h)
			var xp; // pointer into x
			var y; // number of dummy codes added
			var z; // number of entries in current table

			// Generate counts for each bit length

			p = 0;
			i = n;
			do {
				c[b[bindex + p]]++;
				p++;
				i--; // assume all entries <= BMAX
			} while (i !== 0);

			if (c[0] == n) { // null input--all zero length codes
				t[0] = -1;
				m[0] = 0;
				return Z_OK;
			}

			// Find minimum and maximum length, bound *m by those
			l = m[0];
			for (j = 1; j <= BMAX; j++)
				if (c[j] !== 0)
					break;
			k = j; // minimum code length
			if (l < j) {
				l = j;
			}
			for (i = BMAX; i !== 0; i--) {
				if (c[i] !== 0)
					break;
			}
			g = i; // maximum code length
			if (l > i) {
				l = i;
			}
			m[0] = l;

			// Adjust last length count to fill out codes, if needed
			for (y = 1 << j; j < i; j++, y <<= 1) {
				if ((y -= c[j]) < 0) {
					return Z_DATA_ERROR;
				}
			}
			if ((y -= c[i]) < 0) {
				return Z_DATA_ERROR;
			}
			c[i] += y;

			// Generate starting offsets into the value table for each length
			x[1] = j = 0;
			p = 1;
			xp = 2;
			while (--i !== 0) { // note that i == g from above
				x[xp] = (j += c[p]);
				xp++;
				p++;
			}

			// Make a table of values in order of bit lengths
			i = 0;
			p = 0;
			do {
				if ((j = b[bindex + p]) !== 0) {
					v[x[j]++] = i;
				}
				p++;
			} while (++i < n);
			n = x[g]; // set n to length of v

			// Generate the Huffman codes and for each, make the table entries
			x[0] = i = 0; // first Huffman code is zero
			p = 0; // grab values in bit order
			h = -1; // no tables yet--level -1
			w = -l; // bits decoded == (l * h)
			u[0] = 0; // just to keep compilers happy
			q = 0; // ditto
			z = 0; // ditto

			// go through the bit lengths (k already is bits in shortest code)
			for (; k <= g; k++) {
				a = c[k];
				while (a-- !== 0) {
					// here i is the Huffman code of length k bits for value *p
					// make tables up to required level
					while (k > w + l) {
						h++;
						w += l; // previous table always l bits
						// compute minimum size table less than or equal to l bits
						z = g - w;
						z = (z > l) ? l : z; // table size upper limit
						if ((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table
							// too few codes for
							// k-w bit table
							f -= a + 1; // deduct codes from patterns left
							xp = k;
							if (j < z) {
								while (++j < z) { // try smaller tables up to z bits
									if ((f <<= 1) <= c[++xp])
										break; // enough codes to use up j bits
									f -= c[xp]; // else deduct codes from patterns
								}
							}
						}
						z = 1 << j; // table entries for j-bit table

						// allocate new table
						if (hn[0] + z > MANY) { // (note: doesn't matter for fixed)
							return Z_DATA_ERROR; // overflow of MANY
						}
						u[h] = q = /* hp+ */hn[0]; // DEBUG
						hn[0] += z;

						// connect to last table, if there is one
						if (h !== 0) {
							x[h] = i; // save pattern for backing up
							r[0] = /* (byte) */j; // bits in this table
							r[1] = /* (byte) */l; // bits to dump before this table
							j = i >>> (w - l);
							r[2] = /* (int) */(q - u[h - 1] - j); // offset to this table
							hp.set(r, (u[h - 1] + j) * 3);
							// to
							// last
							// table
						} else {
							t[0] = q; // first table is returned result
						}
					}

					// set up table entry in r
					r[1] = /* (byte) */(k - w);
					if (p >= n) {
						r[0] = 128 + 64; // out of values--invalid code
					} else if (v[p] < s) {
						r[0] = /* (byte) */(v[p] < 256 ? 0 : 32 + 64); // 256 is
						// end-of-block
						r[2] = v[p++]; // simple code is just the value
					} else {
						r[0] = /* (byte) */(e[v[p] - s] + 16 + 64); // non-simple--look
						// up in lists
						r[2] = d[v[p++] - s];
					}

					// fill code-like entries with r
					f = 1 << (k - w);
					for (j = i >>> w; j < z; j += f) {
						hp.set(r, (q + j) * 3);
					}

					// backwards increment the k-bit code i
					for (j = 1 << (k - 1); (i & j) !== 0; j >>>= 1) {
						i ^= j;
					}
					i ^= j;

					// backup over finished tables
					mask = (1 << w) - 1; // needed on HP, cc -O bug
					while ((i & mask) != x[h]) {
						h--; // don't need to update q
						w -= l;
						mask = (1 << w) - 1;
					}
				}
			}
			// Return Z_BUF_ERROR if we were given an incomplete table
			return y !== 0 && g != 1 ? Z_BUF_ERROR : Z_OK;
		}

		function initWorkArea(vsize) {
			var i;
			if (!hn) {
				hn = []; // []; //new Array(1);
				v = []; // new Array(vsize);
				c = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
				r = []; // new Array(3);
				u = new Int32Array(BMAX); // new Array(BMAX);
				x = new Int32Array(BMAX + 1); // new Array(BMAX + 1);
			}
			if (v.length < vsize) {
				v = []; // new Array(vsize);
			}
			for (i = 0; i < vsize; i++) {
				v[i] = 0;
			}
			for (i = 0; i < BMAX + 1; i++) {
				c[i] = 0;
			}
			for (i = 0; i < 3; i++) {
				r[i] = 0;
			}
			// for(int i=0; i<BMAX; i++){u[i]=0;}
			u.set(c.subarray(0, BMAX), 0);
			// for(int i=0; i<BMAX+1; i++){x[i]=0;}
			x.set(c.subarray(0, BMAX + 1), 0);
		}

		that.inflate_trees_bits = function(c, // 19 code lengths
		bb, // bits tree desired/actual depth
		tb, // bits tree result
		hp, // space for trees
		z // for messages
		) {
			var result;
			initWorkArea(19);
			hn[0] = 0;
			result = huft_build(c, 0, 19, 19, null, null, tb, bb, hp, hn, v);

			if (result == Z_DATA_ERROR) {
				z.msg = "oversubscribed dynamic bit lengths tree";
			} else if (result == Z_BUF_ERROR || bb[0] === 0) {
				z.msg = "incomplete dynamic bit lengths tree";
				result = Z_DATA_ERROR;
			}
			return result;
		};

		that.inflate_trees_dynamic = function(nl, // number of literal/length codes
		nd, // number of distance codes
		c, // that many (total) code lengths
		bl, // literal desired/actual bit depth
		bd, // distance desired/actual bit depth
		tl, // literal/length tree result
		td, // distance tree result
		hp, // space for trees
		z // for messages
		) {
			var result;

			// build literal/length tree
			initWorkArea(288);
			hn[0] = 0;
			result = huft_build(c, 0, nl, 257, cplens, cplext, tl, bl, hp, hn, v);
			if (result != Z_OK || bl[0] === 0) {
				if (result == Z_DATA_ERROR) {
					z.msg = "oversubscribed literal/length tree";
				} else if (result != Z_MEM_ERROR) {
					z.msg = "incomplete literal/length tree";
					result = Z_DATA_ERROR;
				}
				return result;
			}

			// build distance tree
			initWorkArea(288);
			result = huft_build(c, nl, nd, 0, cpdist, cpdext, td, bd, hp, hn, v);

			if (result != Z_OK || (bd[0] === 0 && nl > 257)) {
				if (result == Z_DATA_ERROR) {
					z.msg = "oversubscribed distance tree";
				} else if (result == Z_BUF_ERROR) {
					z.msg = "incomplete distance tree";
					result = Z_DATA_ERROR;
				} else if (result != Z_MEM_ERROR) {
					z.msg = "empty distance tree with lengths";
					result = Z_DATA_ERROR;
				}
				return result;
			}

			return Z_OK;
		};

	}

	InfTree.inflate_trees_fixed = function(bl, // literal desired/actual bit depth
	bd, // distance desired/actual bit depth
	tl,// literal/length tree result
	td// distance tree result
	) {
		bl[0] = fixed_bl;
		bd[0] = fixed_bd;
		tl[0] = fixed_tl;
		td[0] = fixed_td;
		return Z_OK;
	};

	// InfCodes

	// waiting for "i:"=input,
	// "o:"=output,
	// "x:"=nothing
	var START = 0; // x: set up for LEN
	var LEN = 1; // i: get length/literal/eob next
	var LENEXT = 2; // i: getting length extra (have base)
	var DIST = 3; // i: get distance next
	var DISTEXT = 4;// i: getting distance extra
	var COPY = 5; // o: copying bytes in window, waiting
	// for space
	var LIT = 6; // o: got literal, waiting for output
	// space
	var WASH = 7; // o: got eob, possibly still output
	// waiting
	var END = 8; // x: got eob and all data flushed
	var BADCODE = 9;// x: got error

	function InfCodes() {
		var that = this;

		var mode; // current inflate_codes mode

		// mode dependent information
		var len = 0;

		var tree; // pointer into tree
		var tree_index = 0;
		var need = 0; // bits needed

		var lit = 0;

		// if EXT or COPY, where and how much
		var get = 0; // bits to get for extra
		var dist = 0; // distance back to copy from

		var lbits = 0; // ltree bits decoded per branch
		var dbits = 0; // dtree bits decoder per branch
		var ltree; // literal/length/eob tree
		var ltree_index = 0; // literal/length/eob tree
		var dtree; // distance tree
		var dtree_index = 0; // distance tree

		// Called with number of bytes left to write in window at least 258
		// (the maximum string length) and number of input bytes available
		// at least ten. The ten bytes are six bytes for the longest length/
		// distance pair plus four bytes for overloading the bit buffer.

		function inflate_fast(bl, bd, tl, tl_index, td, td_index, s, z) {
			var t; // temporary pointer
			var tp; // temporary pointer
			var tp_index; // temporary pointer
			var e; // extra bits or operation
			var b; // bit buffer
			var k; // bits in bit buffer
			var p; // input data pointer
			var n; // bytes available there
			var q; // output window write pointer
			var m; // bytes to end of window or read pointer
			var ml; // mask for literal/length tree
			var md; // mask for distance tree
			var c; // bytes to copy
			var d; // distance back to copy from
			var r; // copy source pointer

			var tp_index_t_3; // (tp_index+t)*3

			// load input, output, bit values
			p = z.next_in_index;
			n = z.avail_in;
			b = s.bitb;
			k = s.bitk;
			q = s.write;
			m = q < s.read ? s.read - q - 1 : s.end - q;

			// initialize masks
			ml = inflate_mask[bl];
			md = inflate_mask[bd];

			// do until not enough input or output space for fast loop
			do { // assume called with m >= 258 && n >= 10
				// get literal/length code
				while (k < (20)) { // max bits for literal/length code
					n--;
					b |= (z.read_byte(p++) & 0xff) << k;
					k += 8;
				}

				t = b & ml;
				tp = tl;
				tp_index = tl_index;
				tp_index_t_3 = (tp_index + t) * 3;
				if ((e = tp[tp_index_t_3]) === 0) {
					b >>= (tp[tp_index_t_3 + 1]);
					k -= (tp[tp_index_t_3 + 1]);

					s.window[q++] = /* (byte) */tp[tp_index_t_3 + 2];
					m--;
					continue;
				}
				do {

					b >>= (tp[tp_index_t_3 + 1]);
					k -= (tp[tp_index_t_3 + 1]);

					if ((e & 16) !== 0) {
						e &= 15;
						c = tp[tp_index_t_3 + 2] + (/* (int) */b & inflate_mask[e]);

						b >>= e;
						k -= e;

						// decode distance base of block to copy
						while (k < (15)) { // max bits for distance code
							n--;
							b |= (z.read_byte(p++) & 0xff) << k;
							k += 8;
						}

						t = b & md;
						tp = td;
						tp_index = td_index;
						tp_index_t_3 = (tp_index + t) * 3;
						e = tp[tp_index_t_3];

						do {

							b >>= (tp[tp_index_t_3 + 1]);
							k -= (tp[tp_index_t_3 + 1]);

							if ((e & 16) !== 0) {
								// get extra bits to add to distance base
								e &= 15;
								while (k < (e)) { // get extra bits (up to 13)
									n--;
									b |= (z.read_byte(p++) & 0xff) << k;
									k += 8;
								}

								d = tp[tp_index_t_3 + 2] + (b & inflate_mask[e]);

								b >>= (e);
								k -= (e);

								// do the copy
								m -= c;
								if (q >= d) { // offset before dest
									// just copy
									r = q - d;
									if (q - r > 0 && 2 > (q - r)) {
										s.window[q++] = s.window[r++]; // minimum
										// count is
										// three,
										s.window[q++] = s.window[r++]; // so unroll
										// loop a
										// little
										c -= 2;
									} else {
										s.window.set(s.window.subarray(r, r + 2), q);
										q += 2;
										r += 2;
										c -= 2;
									}
								} else { // else offset after destination
									r = q - d;
									do {
										r += s.end; // force pointer in window
									} while (r < 0); // covers invalid distances
									e = s.end - r;
									if (c > e) { // if source crosses,
										c -= e; // wrapped copy
										if (q - r > 0 && e > (q - r)) {
											do {
												s.window[q++] = s.window[r++];
											} while (--e !== 0);
										} else {
											s.window.set(s.window.subarray(r, r + e), q);
											q += e;
											r += e;
											e = 0;
										}
										r = 0; // copy rest from start of window
									}

								}

								// copy all or what's left
								if (q - r > 0 && c > (q - r)) {
									do {
										s.window[q++] = s.window[r++];
									} while (--c !== 0);
								} else {
									s.window.set(s.window.subarray(r, r + c), q);
									q += c;
									r += c;
									c = 0;
								}
								break;
							} else if ((e & 64) === 0) {
								t += tp[tp_index_t_3 + 2];
								t += (b & inflate_mask[e]);
								tp_index_t_3 = (tp_index + t) * 3;
								e = tp[tp_index_t_3];
							} else {
								z.msg = "invalid distance code";

								c = z.avail_in - n;
								c = (k >> 3) < c ? k >> 3 : c;
								n += c;
								p -= c;
								k -= c << 3;

								s.bitb = b;
								s.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								s.write = q;

								return Z_DATA_ERROR;
							}
						} while (true);
						break;
					}

					if ((e & 64) === 0) {
						t += tp[tp_index_t_3 + 2];
						t += (b & inflate_mask[e]);
						tp_index_t_3 = (tp_index + t) * 3;
						if ((e = tp[tp_index_t_3]) === 0) {

							b >>= (tp[tp_index_t_3 + 1]);
							k -= (tp[tp_index_t_3 + 1]);

							s.window[q++] = /* (byte) */tp[tp_index_t_3 + 2];
							m--;
							break;
						}
					} else if ((e & 32) !== 0) {

						c = z.avail_in - n;
						c = (k >> 3) < c ? k >> 3 : c;
						n += c;
						p -= c;
						k -= c << 3;

						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;

						return Z_STREAM_END;
					} else {
						z.msg = "invalid literal/length code";

						c = z.avail_in - n;
						c = (k >> 3) < c ? k >> 3 : c;
						n += c;
						p -= c;
						k -= c << 3;

						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;

						return Z_DATA_ERROR;
					}
				} while (true);
			} while (m >= 258 && n >= 10);

			// not enough input or output--restore pointers and return
			c = z.avail_in - n;
			c = (k >> 3) < c ? k >> 3 : c;
			n += c;
			p -= c;
			k -= c << 3;

			s.bitb = b;
			s.bitk = k;
			z.avail_in = n;
			z.total_in += p - z.next_in_index;
			z.next_in_index = p;
			s.write = q;

			return Z_OK;
		}

		that.init = function(bl, bd, tl, tl_index, td, td_index) {
			mode = START;
			lbits = /* (byte) */bl;
			dbits = /* (byte) */bd;
			ltree = tl;
			ltree_index = tl_index;
			dtree = td;
			dtree_index = td_index;
			tree = null;
		};

		that.proc = function(s, z, r) {
			var j; // temporary storage
			var tindex; // temporary pointer
			var e; // extra bits or operation
			var b = 0; // bit buffer
			var k = 0; // bits in bit buffer
			var p = 0; // input data pointer
			var n; // bytes available there
			var q; // output window write pointer
			var m; // bytes to end of window or read pointer
			var f; // pointer to copy strings from

			// copy input/output information to locals (UPDATE macro restores)
			p = z.next_in_index;
			n = z.avail_in;
			b = s.bitb;
			k = s.bitk;
			q = s.write;
			m = q < s.read ? s.read - q - 1 : s.end - q;

			// process input and output based on current state
			while (true) {
				switch (mode) {
				// waiting for "i:"=input, "o:"=output, "x:"=nothing
				case START: // x: set up for LEN
					if (m >= 258 && n >= 10) {

						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;
						r = inflate_fast(lbits, dbits, ltree, ltree_index, dtree, dtree_index, s, z);

						p = z.next_in_index;
						n = z.avail_in;
						b = s.bitb;
						k = s.bitk;
						q = s.write;
						m = q < s.read ? s.read - q - 1 : s.end - q;

						if (r != Z_OK) {
							mode = r == Z_STREAM_END ? WASH : BADCODE;
							break;
						}
					}
					need = lbits;
					tree = ltree;
					tree_index = ltree_index;

					mode = LEN;
				case LEN: // i: get length/literal/eob next
					j = need;

					while (k < (j)) {
						if (n !== 0)
							r = Z_OK;
						else {

							s.bitb = b;
							s.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							s.write = q;
							return s.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					tindex = (tree_index + (b & inflate_mask[j])) * 3;

					b >>>= (tree[tindex + 1]);
					k -= (tree[tindex + 1]);

					e = tree[tindex];

					if (e === 0) { // literal
						lit = tree[tindex + 2];
						mode = LIT;
						break;
					}
					if ((e & 16) !== 0) { // length
						get = e & 15;
						len = tree[tindex + 2];
						mode = LENEXT;
						break;
					}
					if ((e & 64) === 0) { // next table
						need = e;
						tree_index = tindex / 3 + tree[tindex + 2];
						break;
					}
					if ((e & 32) !== 0) { // end of block
						mode = WASH;
						break;
					}
					mode = BADCODE; // invalid code
					z.msg = "invalid literal/length code";
					r = Z_DATA_ERROR;

					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);

				case LENEXT: // i: getting length extra (have base)
					j = get;

					while (k < (j)) {
						if (n !== 0)
							r = Z_OK;
						else {

							s.bitb = b;
							s.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							s.write = q;
							return s.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					len += (b & inflate_mask[j]);

					b >>= j;
					k -= j;

					need = dbits;
					tree = dtree;
					tree_index = dtree_index;
					mode = DIST;
				case DIST: // i: get distance next
					j = need;

					while (k < (j)) {
						if (n !== 0)
							r = Z_OK;
						else {

							s.bitb = b;
							s.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							s.write = q;
							return s.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					tindex = (tree_index + (b & inflate_mask[j])) * 3;

					b >>= tree[tindex + 1];
					k -= tree[tindex + 1];

					e = (tree[tindex]);
					if ((e & 16) !== 0) { // distance
						get = e & 15;
						dist = tree[tindex + 2];
						mode = DISTEXT;
						break;
					}
					if ((e & 64) === 0) { // next table
						need = e;
						tree_index = tindex / 3 + tree[tindex + 2];
						break;
					}
					mode = BADCODE; // invalid code
					z.msg = "invalid distance code";
					r = Z_DATA_ERROR;

					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);

				case DISTEXT: // i: getting distance extra
					j = get;

					while (k < (j)) {
						if (n !== 0)
							r = Z_OK;
						else {

							s.bitb = b;
							s.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							s.write = q;
							return s.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					dist += (b & inflate_mask[j]);

					b >>= j;
					k -= j;

					mode = COPY;
				case COPY: // o: copying bytes in window, waiting for space
					f = q - dist;
					while (f < 0) { // modulo window size-"while" instead
						f += s.end; // of "if" handles invalid distances
					}
					while (len !== 0) {

						if (m === 0) {
							if (q == s.end && s.read !== 0) {
								q = 0;
								m = q < s.read ? s.read - q - 1 : s.end - q;
							}
							if (m === 0) {
								s.write = q;
								r = s.inflate_flush(z, r);
								q = s.write;
								m = q < s.read ? s.read - q - 1 : s.end - q;

								if (q == s.end && s.read !== 0) {
									q = 0;
									m = q < s.read ? s.read - q - 1 : s.end - q;
								}

								if (m === 0) {
									s.bitb = b;
									s.bitk = k;
									z.avail_in = n;
									z.total_in += p - z.next_in_index;
									z.next_in_index = p;
									s.write = q;
									return s.inflate_flush(z, r);
								}
							}
						}

						s.window[q++] = s.window[f++];
						m--;

						if (f == s.end)
							f = 0;
						len--;
					}
					mode = START;
					break;
				case LIT: // o: got literal, waiting for output space
					if (m === 0) {
						if (q == s.end && s.read !== 0) {
							q = 0;
							m = q < s.read ? s.read - q - 1 : s.end - q;
						}
						if (m === 0) {
							s.write = q;
							r = s.inflate_flush(z, r);
							q = s.write;
							m = q < s.read ? s.read - q - 1 : s.end - q;

							if (q == s.end && s.read !== 0) {
								q = 0;
								m = q < s.read ? s.read - q - 1 : s.end - q;
							}
							if (m === 0) {
								s.bitb = b;
								s.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								s.write = q;
								return s.inflate_flush(z, r);
							}
						}
					}
					r = Z_OK;

					s.window[q++] = /* (byte) */lit;
					m--;

					mode = START;
					break;
				case WASH: // o: got eob, possibly more output
					if (k > 7) { // return unused byte, if any
						k -= 8;
						n++;
						p--; // can always return one
					}

					s.write = q;
					r = s.inflate_flush(z, r);
					q = s.write;
					m = q < s.read ? s.read - q - 1 : s.end - q;

					if (s.read != s.write) {
						s.bitb = b;
						s.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						s.write = q;
						return s.inflate_flush(z, r);
					}
					mode = END;
				case END:
					r = Z_STREAM_END;
					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);

				case BADCODE: // x: got error

					r = Z_DATA_ERROR;

					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);

				default:
					r = Z_STREAM_ERROR;

					s.bitb = b;
					s.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					s.write = q;
					return s.inflate_flush(z, r);
				}
			}
		};

		that.free = function() {
			// ZFREE(z, c);
		};

	}

	// InfBlocks

	// Table for deflate from PKZIP's appnote.txt.
	var border = [ // Order of the bit length code lengths
	16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];

	var TYPE = 0; // get type bits (3, including end bit)
	var LENS = 1; // get lengths for stored
	var STORED = 2;// processing stored block
	var TABLE = 3; // get table lengths
	var BTREE = 4; // get bit lengths tree for a dynamic
	// block
	var DTREE = 5; // get length, distance trees for a
	// dynamic block
	var CODES = 6; // processing fixed or dynamic block
	var DRY = 7; // output remaining window bytes
	var DONELOCKS = 8; // finished last block, done
	var BADBLOCKS = 9; // ot a data error--stuck here

	function InfBlocks(z, w) {
		var that = this;

		var mode = TYPE; // current inflate_block mode

		var left = 0; // if STORED, bytes left to copy

		var table = 0; // table lengths (14 bits)
		var index = 0; // index into blens (or border)
		var blens; // bit lengths of codes
		var bb = [ 0 ]; // bit length tree depth
		var tb = [ 0 ]; // bit length decoding tree

		var codes = new InfCodes(); // if CODES, current state

		var last = 0; // true if this block is the last block

		var hufts = new Int32Array(MANY * 3); // single malloc for tree space
		var check = 0; // check on output
		var inftree = new InfTree();

		that.bitk = 0; // bits in bit buffer
		that.bitb = 0; // bit buffer
		that.window = new Uint8Array(w); // sliding window
		that.end = w; // one byte after sliding window
		that.read = 0; // window read pointer
		that.write = 0; // window write pointer

		that.reset = function(z, c) {
			if (c)
				c[0] = check;
			// if (mode == BTREE || mode == DTREE) {
			// }
			if (mode == CODES) {
				codes.free(z);
			}
			mode = TYPE;
			that.bitk = 0;
			that.bitb = 0;
			that.read = that.write = 0;
		};

		that.reset(z, null);

		// copy as much as possible from the sliding window to the output area
		that.inflate_flush = function(z, r) {
			var n;
			var p;
			var q;

			// local copies of source and destination pointers
			p = z.next_out_index;
			q = that.read;

			// compute number of bytes to copy as far as end of window
			n = /* (int) */((q <= that.write ? that.write : that.end) - q);
			if (n > z.avail_out)
				n = z.avail_out;
			if (n !== 0 && r == Z_BUF_ERROR)
				r = Z_OK;

			// update counters
			z.avail_out -= n;
			z.total_out += n;

			// copy as far as end of window
			z.next_out.set(that.window.subarray(q, q + n), p);
			p += n;
			q += n;

			// see if more to copy at beginning of window
			if (q == that.end) {
				// wrap pointers
				q = 0;
				if (that.write == that.end)
					that.write = 0;

				// compute bytes to copy
				n = that.write - q;
				if (n > z.avail_out)
					n = z.avail_out;
				if (n !== 0 && r == Z_BUF_ERROR)
					r = Z_OK;

				// update counters
				z.avail_out -= n;
				z.total_out += n;

				// copy
				z.next_out.set(that.window.subarray(q, q + n), p);
				p += n;
				q += n;
			}

			// update pointers
			z.next_out_index = p;
			that.read = q;

			// done
			return r;
		};

		that.proc = function(z, r) {
			var t; // temporary storage
			var b; // bit buffer
			var k; // bits in bit buffer
			var p; // input data pointer
			var n; // bytes available there
			var q; // output window write pointer
			var m; // bytes to end of window or read pointer

			var i;

			// copy input/output information to locals (UPDATE macro restores)
			// {
			p = z.next_in_index;
			n = z.avail_in;
			b = that.bitb;
			k = that.bitk;
			// }
			// {
			q = that.write;
			m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
			// }

			// process input based on current state
			// DEBUG dtree
			while (true) {
				switch (mode) {
				case TYPE:

					while (k < (3)) {
						if (n !== 0) {
							r = Z_OK;
						} else {
							that.bitb = b;
							that.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							that.write = q;
							return that.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}
					t = /* (int) */(b & 7);
					last = t & 1;

					switch (t >>> 1) {
					case 0: // stored
						// {
						b >>>= (3);
						k -= (3);
						// }
						t = k & 7; // go to byte boundary

						// {
						b >>>= (t);
						k -= (t);
						// }
						mode = LENS; // get length of stored block
						break;
					case 1: // fixed
						// {
						var bl = []; // new Array(1);
						var bd = []; // new Array(1);
						var tl = [ [] ]; // new Array(1);
						var td = [ [] ]; // new Array(1);

						InfTree.inflate_trees_fixed(bl, bd, tl, td);
						codes.init(bl[0], bd[0], tl[0], 0, td[0], 0);
						// }

						// {
						b >>>= (3);
						k -= (3);
						// }

						mode = CODES;
						break;
					case 2: // dynamic

						// {
						b >>>= (3);
						k -= (3);
						// }

						mode = TABLE;
						break;
					case 3: // illegal

						// {
						b >>>= (3);
						k -= (3);
						// }
						mode = BADBLOCKS;
						z.msg = "invalid block type";
						r = Z_DATA_ERROR;

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					break;
				case LENS:

					while (k < (32)) {
						if (n !== 0) {
							r = Z_OK;
						} else {
							that.bitb = b;
							that.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							that.write = q;
							return that.inflate_flush(z, r);
						}
						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					if ((((~b) >>> 16) & 0xffff) != (b & 0xffff)) {
						mode = BADBLOCKS;
						z.msg = "invalid stored block lengths";
						r = Z_DATA_ERROR;

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					left = (b & 0xffff);
					b = k = 0; // dump bits
					mode = left !== 0 ? STORED : (last !== 0 ? DRY : TYPE);
					break;
				case STORED:
					if (n === 0) {
						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}

					if (m === 0) {
						if (q == that.end && that.read !== 0) {
							q = 0;
							m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
						}
						if (m === 0) {
							that.write = q;
							r = that.inflate_flush(z, r);
							q = that.write;
							m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
							if (q == that.end && that.read !== 0) {
								q = 0;
								m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
							}
							if (m === 0) {
								that.bitb = b;
								that.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								that.write = q;
								return that.inflate_flush(z, r);
							}
						}
					}
					r = Z_OK;

					t = left;
					if (t > n)
						t = n;
					if (t > m)
						t = m;
					that.window.set(z.read_buf(p, t), q);
					p += t;
					n -= t;
					q += t;
					m -= t;
					if ((left -= t) !== 0)
						break;
					mode = last !== 0 ? DRY : TYPE;
					break;
				case TABLE:

					while (k < (14)) {
						if (n !== 0) {
							r = Z_OK;
						} else {
							that.bitb = b;
							that.bitk = k;
							z.avail_in = n;
							z.total_in += p - z.next_in_index;
							z.next_in_index = p;
							that.write = q;
							return that.inflate_flush(z, r);
						}

						n--;
						b |= (z.read_byte(p++) & 0xff) << k;
						k += 8;
					}

					table = t = (b & 0x3fff);
					if ((t & 0x1f) > 29 || ((t >> 5) & 0x1f) > 29) {
						mode = BADBLOCKS;
						z.msg = "too many length or distance symbols";
						r = Z_DATA_ERROR;

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					t = 258 + (t & 0x1f) + ((t >> 5) & 0x1f);
					if (!blens || blens.length < t) {
						blens = []; // new Array(t);
					} else {
						for (i = 0; i < t; i++) {
							blens[i] = 0;
						}
					}

					// {
					b >>>= (14);
					k -= (14);
					// }

					index = 0;
					mode = BTREE;
				case BTREE:
					while (index < 4 + (table >>> 10)) {
						while (k < (3)) {
							if (n !== 0) {
								r = Z_OK;
							} else {
								that.bitb = b;
								that.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								that.write = q;
								return that.inflate_flush(z, r);
							}
							n--;
							b |= (z.read_byte(p++) & 0xff) << k;
							k += 8;
						}

						blens[border[index++]] = b & 7;

						// {
						b >>>= (3);
						k -= (3);
						// }
					}

					while (index < 19) {
						blens[border[index++]] = 0;
					}

					bb[0] = 7;
					t = inftree.inflate_trees_bits(blens, bb, tb, hufts, z);
					if (t != Z_OK) {
						r = t;
						if (r == Z_DATA_ERROR) {
							blens = null;
							mode = BADBLOCKS;
						}

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}

					index = 0;
					mode = DTREE;
				case DTREE:
					while (true) {
						t = table;
						if (!(index < 258 + (t & 0x1f) + ((t >> 5) & 0x1f))) {
							break;
						}

						var j, c;

						t = bb[0];

						while (k < (t)) {
							if (n !== 0) {
								r = Z_OK;
							} else {
								that.bitb = b;
								that.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								that.write = q;
								return that.inflate_flush(z, r);
							}
							n--;
							b |= (z.read_byte(p++) & 0xff) << k;
							k += 8;
						}

						// if (tb[0] == -1) {
						// System.err.println("null...");
						// }

						t = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 1];
						c = hufts[(tb[0] + (b & inflate_mask[t])) * 3 + 2];

						if (c < 16) {
							b >>>= (t);
							k -= (t);
							blens[index++] = c;
						} else { // c == 16..18
							i = c == 18 ? 7 : c - 14;
							j = c == 18 ? 11 : 3;

							while (k < (t + i)) {
								if (n !== 0) {
									r = Z_OK;
								} else {
									that.bitb = b;
									that.bitk = k;
									z.avail_in = n;
									z.total_in += p - z.next_in_index;
									z.next_in_index = p;
									that.write = q;
									return that.inflate_flush(z, r);
								}
								n--;
								b |= (z.read_byte(p++) & 0xff) << k;
								k += 8;
							}

							b >>>= (t);
							k -= (t);

							j += (b & inflate_mask[i]);

							b >>>= (i);
							k -= (i);

							i = index;
							t = table;
							if (i + j > 258 + (t & 0x1f) + ((t >> 5) & 0x1f) || (c == 16 && i < 1)) {
								blens = null;
								mode = BADBLOCKS;
								z.msg = "invalid bit length repeat";
								r = Z_DATA_ERROR;

								that.bitb = b;
								that.bitk = k;
								z.avail_in = n;
								z.total_in += p - z.next_in_index;
								z.next_in_index = p;
								that.write = q;
								return that.inflate_flush(z, r);
							}

							c = c == 16 ? blens[i - 1] : 0;
							do {
								blens[i++] = c;
							} while (--j !== 0);
							index = i;
						}
					}

					tb[0] = -1;
					// {
					var bl_ = []; // new Array(1);
					var bd_ = []; // new Array(1);
					var tl_ = []; // new Array(1);
					var td_ = []; // new Array(1);
					bl_[0] = 9; // must be <= 9 for lookahead assumptions
					bd_[0] = 6; // must be <= 9 for lookahead assumptions

					t = table;
					t = inftree.inflate_trees_dynamic(257 + (t & 0x1f), 1 + ((t >> 5) & 0x1f), blens, bl_, bd_, tl_, td_, hufts, z);

					if (t != Z_OK) {
						if (t == Z_DATA_ERROR) {
							blens = null;
							mode = BADBLOCKS;
						}
						r = t;

						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					codes.init(bl_[0], bd_[0], hufts, tl_[0], hufts, td_[0]);
					// }
					mode = CODES;
				case CODES:
					that.bitb = b;
					that.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					that.write = q;

					if ((r = codes.proc(that, z, r)) != Z_STREAM_END) {
						return that.inflate_flush(z, r);
					}
					r = Z_OK;
					codes.free(z);

					p = z.next_in_index;
					n = z.avail_in;
					b = that.bitb;
					k = that.bitk;
					q = that.write;
					m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);

					if (last === 0) {
						mode = TYPE;
						break;
					}
					mode = DRY;
				case DRY:
					that.write = q;
					r = that.inflate_flush(z, r);
					q = that.write;
					m = /* (int) */(q < that.read ? that.read - q - 1 : that.end - q);
					if (that.read != that.write) {
						that.bitb = b;
						that.bitk = k;
						z.avail_in = n;
						z.total_in += p - z.next_in_index;
						z.next_in_index = p;
						that.write = q;
						return that.inflate_flush(z, r);
					}
					mode = DONELOCKS;
				case DONELOCKS:
					r = Z_STREAM_END;

					that.bitb = b;
					that.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					that.write = q;
					return that.inflate_flush(z, r);
				case BADBLOCKS:
					r = Z_DATA_ERROR;

					that.bitb = b;
					that.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					that.write = q;
					return that.inflate_flush(z, r);

				default:
					r = Z_STREAM_ERROR;

					that.bitb = b;
					that.bitk = k;
					z.avail_in = n;
					z.total_in += p - z.next_in_index;
					z.next_in_index = p;
					that.write = q;
					return that.inflate_flush(z, r);
				}
			}
		};

		that.free = function(z) {
			that.reset(z, null);
			that.window = null;
			hufts = null;
			// ZFREE(z, s);
		};

		that.set_dictionary = function(d, start, n) {
			that.window.set(d.subarray(start, start + n), 0);
			that.read = that.write = n;
		};

		// Returns true if inflate is currently at the end of a block generated
		// by Z_SYNC_FLUSH or Z_FULL_FLUSH.
		that.sync_point = function() {
			return mode == LENS ? 1 : 0;
		};

	}

	// Inflate

	// preset dictionary flag in zlib header
	var PRESET_DICT = 0x20;

	var Z_DEFLATED = 8;

	var METHOD = 0; // waiting for method byte
	var FLAG = 1; // waiting for flag byte
	var DICT4 = 2; // four dictionary check bytes to go
	var DICT3 = 3; // three dictionary check bytes to go
	var DICT2 = 4; // two dictionary check bytes to go
	var DICT1 = 5; // one dictionary check byte to go
	var DICT0 = 6; // waiting for inflateSetDictionary
	var BLOCKS = 7; // decompressing blocks
	var DONE = 12; // finished check, done
	var BAD = 13; // got an error--stay here

	var mark = [ 0, 0, 0xff, 0xff ];

	function Inflate() {
		var that = this;

		that.mode = 0; // current inflate mode

		// mode dependent information
		that.method = 0; // if FLAGS, method byte

		// if CHECK, check values to compare
		that.was = [ 0 ]; // new Array(1); // computed check value
		that.need = 0; // stream check value

		// if BAD, inflateSync's marker bytes count
		that.marker = 0;

		// mode independent information
		that.wbits = 0; // log2(window size) (8..15, defaults to 15)

		// this.blocks; // current inflate_blocks state

		function inflateReset(z) {
			if (!z || !z.istate)
				return Z_STREAM_ERROR;

			z.total_in = z.total_out = 0;
			z.msg = null;
			z.istate.mode = BLOCKS;
			z.istate.blocks.reset(z, null);
			return Z_OK;
		}

		that.inflateEnd = function(z) {
			if (that.blocks)
				that.blocks.free(z);
			that.blocks = null;
			// ZFREE(z, z->state);
			return Z_OK;
		};

		that.inflateInit = function(z, w) {
			z.msg = null;
			that.blocks = null;

			// set window size
			if (w < 8 || w > 15) {
				that.inflateEnd(z);
				return Z_STREAM_ERROR;
			}
			that.wbits = w;

			z.istate.blocks = new InfBlocks(z, 1 << w);

			// reset state
			inflateReset(z);
			return Z_OK;
		};

		that.inflate = function(z, f) {
			var r;
			var b;

			if (!z || !z.istate || !z.next_in)
				return Z_STREAM_ERROR;
			f = f == Z_FINISH ? Z_BUF_ERROR : Z_OK;
			r = Z_BUF_ERROR;
			while (true) {
				// System.out.println("mode: "+z.istate.mode);
				switch (z.istate.mode) {
				case METHOD:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					if (((z.istate.method = z.read_byte(z.next_in_index++)) & 0xf) != Z_DEFLATED) {
						z.istate.mode = BAD;
						z.msg = "unknown compression method";
						z.istate.marker = 5; // can't try inflateSync
						break;
					}
					if ((z.istate.method >> 4) + 8 > z.istate.wbits) {
						z.istate.mode = BAD;
						z.msg = "invalid window size";
						z.istate.marker = 5; // can't try inflateSync
						break;
					}
					z.istate.mode = FLAG;
				case FLAG:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					b = (z.read_byte(z.next_in_index++)) & 0xff;

					if ((((z.istate.method << 8) + b) % 31) !== 0) {
						z.istate.mode = BAD;
						z.msg = "incorrect header check";
						z.istate.marker = 5; // can't try inflateSync
						break;
					}

					if ((b & PRESET_DICT) === 0) {
						z.istate.mode = BLOCKS;
						break;
					}
					z.istate.mode = DICT4;
				case DICT4:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					z.istate.need = ((z.read_byte(z.next_in_index++) & 0xff) << 24) & 0xff000000;
					z.istate.mode = DICT3;
				case DICT3:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					z.istate.need += ((z.read_byte(z.next_in_index++) & 0xff) << 16) & 0xff0000;
					z.istate.mode = DICT2;
				case DICT2:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					z.istate.need += ((z.read_byte(z.next_in_index++) & 0xff) << 8) & 0xff00;
					z.istate.mode = DICT1;
				case DICT1:

					if (z.avail_in === 0)
						return r;
					r = f;

					z.avail_in--;
					z.total_in++;
					z.istate.need += (z.read_byte(z.next_in_index++) & 0xff);
					z.istate.mode = DICT0;
					return Z_NEED_DICT;
				case DICT0:
					z.istate.mode = BAD;
					z.msg = "need dictionary";
					z.istate.marker = 0; // can try inflateSync
					return Z_STREAM_ERROR;
				case BLOCKS:

					r = z.istate.blocks.proc(z, r);
					if (r == Z_DATA_ERROR) {
						z.istate.mode = BAD;
						z.istate.marker = 0; // can try inflateSync
						break;
					}
					if (r == Z_OK) {
						r = f;
					}
					if (r != Z_STREAM_END) {
						return r;
					}
					r = f;
					z.istate.blocks.reset(z, z.istate.was);
					z.istate.mode = DONE;
				case DONE:
					return Z_STREAM_END;
				case BAD:
					return Z_DATA_ERROR;
				default:
					return Z_STREAM_ERROR;
				}
			}
		};

		that.inflateSetDictionary = function(z, dictionary, dictLength) {
			var index = 0;
			var length = dictLength;
			if (!z || !z.istate || z.istate.mode != DICT0)
				return Z_STREAM_ERROR;

			if (length >= (1 << z.istate.wbits)) {
				length = (1 << z.istate.wbits) - 1;
				index = dictLength - length;
			}
			z.istate.blocks.set_dictionary(dictionary, index, length);
			z.istate.mode = BLOCKS;
			return Z_OK;
		};

		that.inflateSync = function(z) {
			var n; // number of bytes to look at
			var p; // pointer to bytes
			var m; // number of marker bytes found in a row
			var r, w; // temporaries to save total_in and total_out

			// set up
			if (!z || !z.istate)
				return Z_STREAM_ERROR;
			if (z.istate.mode != BAD) {
				z.istate.mode = BAD;
				z.istate.marker = 0;
			}
			if ((n = z.avail_in) === 0)
				return Z_BUF_ERROR;
			p = z.next_in_index;
			m = z.istate.marker;

			// search
			while (n !== 0 && m < 4) {
				if (z.read_byte(p) == mark[m]) {
					m++;
				} else if (z.read_byte(p) !== 0) {
					m = 0;
				} else {
					m = 4 - m;
				}
				p++;
				n--;
			}

			// restore
			z.total_in += p - z.next_in_index;
			z.next_in_index = p;
			z.avail_in = n;
			z.istate.marker = m;

			// return no joy or set up to restart on a new block
			if (m != 4) {
				return Z_DATA_ERROR;
			}
			r = z.total_in;
			w = z.total_out;
			inflateReset(z);
			z.total_in = r;
			z.total_out = w;
			z.istate.mode = BLOCKS;
			return Z_OK;
		};

		// Returns true if inflate is currently at the end of a block generated
		// by Z_SYNC_FLUSH or Z_FULL_FLUSH. This function is used by one PPP
		// implementation to provide an additional safety check. PPP uses
		// Z_SYNC_FLUSH
		// but removes the length bytes of the resulting empty stored block. When
		// decompressing, PPP checks that at the end of input packet, inflate is
		// waiting for these length bytes.
		that.inflateSyncPoint = function(z) {
			if (!z || !z.istate || !z.istate.blocks)
				return Z_STREAM_ERROR;
			return z.istate.blocks.sync_point();
		};
	}

	// ZStream

	function ZStream() {
	}

	ZStream.prototype = {
		inflateInit : function(bits) {
			var that = this;
			that.istate = new Inflate();
			if (!bits)
				bits = MAX_BITS;
			return that.istate.inflateInit(that, bits);
		},

		inflate : function(f) {
			var that = this;
			if (!that.istate)
				return Z_STREAM_ERROR;
			return that.istate.inflate(that, f);
		},

		inflateEnd : function() {
			var that = this;
			if (!that.istate)
				return Z_STREAM_ERROR;
			var ret = that.istate.inflateEnd(that);
			that.istate = null;
			return ret;
		},

		inflateSync : function() {
			var that = this;
			if (!that.istate)
				return Z_STREAM_ERROR;
			return that.istate.inflateSync(that);
		},
		inflateSetDictionary : function(dictionary, dictLength) {
			var that = this;
			if (!that.istate)
				return Z_STREAM_ERROR;
			return that.istate.inflateSetDictionary(that, dictionary, dictLength);
		},
		read_byte : function(start) {
			var that = this;
			return that.next_in.subarray(start, start + 1)[0];
		},
		read_buf : function(start, size) {
			var that = this;
			return that.next_in.subarray(start, start + size);
		}
	};

	// Inflater

	function Inflater() {
		var that = this;
		var z = new ZStream();
		var bufsize = 512;
		var flush = Z_NO_FLUSH;
		var buf = new Uint8Array(bufsize);
		var nomoreinput = false;

		z.inflateInit();
		z.next_out = buf;

		that.append = function(data, onprogress) {
			var err, buffers = [], lastIndex = 0, bufferIndex = 0, bufferSize = 0, array;
			if (data.length === 0)
				return;
			z.next_in_index = 0;
			z.next_in = data;
			z.avail_in = data.length;
			do {
				z.next_out_index = 0;
				z.avail_out = bufsize;
				if ((z.avail_in === 0) && (!nomoreinput)) { // if buffer is empty and more input is available, refill it
					z.next_in_index = 0;
					nomoreinput = true;
				}
				err = z.inflate(flush);
				if (nomoreinput && (err == Z_BUF_ERROR))
					return -1;
				if (err != Z_OK && err != Z_STREAM_END)
					throw "inflating: " + z.msg;
				if ((nomoreinput || err == Z_STREAM_END) && (z.avail_in == data.length))
					return -1;
				if (z.next_out_index)
					if (z.next_out_index == bufsize)
						buffers.push(new Uint8Array(buf));
					else
						buffers.push(new Uint8Array(buf.subarray(0, z.next_out_index)));
				bufferSize += z.next_out_index;
				if (onprogress && z.next_in_index > 0 && z.next_in_index != lastIndex) {
					onprogress(z.next_in_index);
					lastIndex = z.next_in_index;
				}
			} while (z.avail_in > 0 || z.avail_out === 0);
			array = new Uint8Array(bufferSize);
			buffers.forEach(function(chunk) {
				array.set(chunk, bufferIndex);
				bufferIndex += chunk.length;
			});
			return array;
		};
		that.flush = function() {
			z.inflateEnd();
		};
	}

	var inflater;

	if (obj.zip)
		obj.zip.Inflater = Inflater;
	else {
		inflater = new Inflater();
		obj.addEventListener("message", function(event) {
			var message = event.data;

			if (message.append)
				obj.postMessage({
					onappend : true,
					data : inflater.append(message.data, function(current) {
						obj.postMessage({
							progress : true,
							current : current
						});
					})
				});
			if (message.flush) {
				inflater.flush();
				obj.postMessage({
					onflush : true
				});
			}
		}, false);
	}

})(this);

//# sourceMappingURL=inflate.js.map
;
/*! fileStorage - v0.1.0 - 2013-06-04 */
var fileStorage = fileStorage || {};
var _requestFileSystem=self.requestFileSystem||self.webkitRequestFileSystem;const DBSIZE=5242880,DBTYPE=TEMPORARY;self.onmessage=function(e){var t=e.data;self.request(t,function(e){self.save(t,e,function(){self.postMessage(t)})})},self.openFs=function(e){if(self._fs){e&&e(self._fs);return}_requestFileSystem(DBTYPE,DBSIZE,function(t){self._fs=t,e&&e(t)},self.failure)},self.request=function(e,t){var n=new self.loadFile(e);n.succeeded=function(e){t&&t(e)},n.failed=function(e){self.postMessage("failed: "+e.toString())},n.start()},self.save=function(e,t,n){self.openFs(function(r){var i=e.split("/").slice(0,-1);self.createDir(r.root,i),r.root.getFile(e,{create:!0},function(r){r.createWriter(function(r){r.onwriteend=function(e){n(e)},r.onerror=function(t){self.postMessage("write error:"+self.errorHandler(err)+" path="+e)},r.write(t)})},self.failure)})},self.createDir=function(e,t){if(t[0]=="."||t[0]=="")t=t.slice(1);e.getDirectory(t[0],{create:!0},function(e){t.length&&createDir(e,t.slice(1))},self.failure)},self.failure=function(e){self.postMessage("failed: "+self.errorHandler(e))},self.errorHandler=function(e){switch(e.code){case FileError.QUOTA_EXCEEDED_ERR:return"QUOTA_EXCEEDED_ERR";case FileError.NOT_FOUND_ERR:return"NOT_FOUND_ERR";case FileError.SECURITY_ERR:return"SECURITY_ERR";case FileError.INVALID_MODIFICATION_ERR:return"INVALID_MODIFICATION_ERR";case FileError.INVALID_STATE_ERR:return"INVALID_STATE_ERR";default:return"Unknown Error"}},self.loadFile=function(e,t){var n=new XMLHttpRequest;return this.succeeded=function(e){t&&t(e)},this.failed=function(e){console.log("Error:",e)},this.start=function(){var t=this;n.open("GET",e,!0),n.responseType="blob",n.onload=function(e){this.status==200&&t.succeeded(this.response)},n.onerror=function(e){t.failed(this.status)},n.send()},{start:this.start,succeeded:this.succeeded,failed:this.failed}},self.openFs();
//# sourceMappingURL=loader_filesystem.min.js.map
;
/*!
* screenfull
* v1.1.0 - 2013-09-06
* https://github.com/sindresorhus/screenfull.js
* (c) Sindre Sorhus; MIT License
*/

!function(a,b){"use strict";var c="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,d=function(){for(var a,c,d=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenchange","MSFullscreenerror"]],e=0,f=d.length,g={};f>e;e++)if(a=d[e],a&&a[1]in b){for(e=0,c=a.length;c>e;e++)g[d[0][e]]=a[e];return g}return!1}(),e={request:function(a){var e=d.requestFullscreen;a=a||b.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?a[e]():a[e](c&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){b[d.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(){},onerror:function(){},raw:d};return d?(Object.defineProperties(e,{isFullscreen:{get:function(){return!!b[d.fullscreenElement]}},element:{enumerable:!0,get:function(){return b[d.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!b[d.fullscreenEnabled]}}}),b.addEventListener(d.fullscreenchange,function(a){e.onchange.call(e,a)}),b.addEventListener(d.fullscreenerror,function(a){e.onerror.call(e,a)}),a.screenfull=e,void 0):(a.screenfull=!1,void 0)}(window,document);
/*
 Copyright (c) 2012 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


(function(obj) {

	var ERR_BAD_FORMAT = "File format is not recognized.";
	var ERR_ENCRYPTED = "File contains encrypted entry.";
	var ERR_ZIP64 = "File is using Zip64 (4gb+ file size).";
	var ERR_READ = "Error while reading zip file.";
	var ERR_WRITE = "Error while writing zip file.";
	var ERR_WRITE_DATA = "Error while writing file data.";
	var ERR_READ_DATA = "Error while reading file data.";
	var ERR_DUPLICATED_NAME = "File already exists.";
	var ERR_HTTP_RANGE = "HTTP Range not supported.";
	var CHUNK_SIZE = 512 * 1024;

	var INFLATE_JS = "inflate.js";
	var DEFLATE_JS = "deflate.js";

	var appendABViewSupported;
	try {
		appendABViewSupported = new Blob([ getDataHelper(0).view ]).size == 0;
	} catch (e) {
	}	

	function Crc32() {
		var crc = -1, that = this;
		that.append = function(data) {
			var offset, table = that.table;
			for (offset = 0; offset < data.length; offset++)
				crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
		};
		that.get = function() {
			return ~crc;
		};
	}
	Crc32.prototype.table = (function() {
		var i, j, t, table = [];
		for (i = 0; i < 256; i++) {
			t = i;
			for (j = 0; j < 8; j++)
				if (t & 1)
					t = (t >>> 1) ^ 0xEDB88320;
				else
					t = t >>> 1;
			table[i] = t;
		}
		return table;
	})();

	function blobSlice(blob, index, length) {
		if (blob.slice)
			return blob.slice(index, index + length);
		else if (blob.webkitSlice)
			return blob.webkitSlice(index, index + length);
		else if (blob.mozSlice)
			return blob.mozSlice(index, index + length);
		else if (blob.msSlice)
			return blob.msSlice(index, index + length);
	}

	function getDataHelper(byteLength, bytes) {
		var dataBuffer, dataArray;
		dataBuffer = new ArrayBuffer(byteLength);
		dataArray = new Uint8Array(dataBuffer);
		if (bytes)
			dataArray.set(bytes, 0);
		return {
			buffer : dataBuffer,
			array : dataArray,
			view : new DataView(dataBuffer)
		};
	}

	// Readers
	function Reader() {
	}

	function TextReader(text) {
		var that = this, blobReader;

		function init(callback, onerror) {
			var blob = new Blob([ text ], {
				type : "text/plain"
			});
			blobReader = new BlobReader(blob);
			blobReader.init(function() {
				that.size = blobReader.size;
				callback();
			}, onerror);
		}

		function readUint8Array(index, length, callback, onerror) {
			blobReader.readUint8Array(index, length, callback, onerror);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	TextReader.prototype = new Reader();
	TextReader.prototype.constructor = TextReader;

	function Data64URIReader(dataURI) {
		var that = this, dataStart;

		function init(callback) {
			var dataEnd = dataURI.length;
			while (dataURI.charAt(dataEnd - 1) == "=")
				dataEnd--;
			dataStart = dataURI.indexOf(",") + 1;
			that.size = Math.floor((dataEnd - dataStart) * 0.75);
			callback();
		}

		function readUint8Array(index, length, callback) {
			var i, data = getDataHelper(length);
			var start = Math.floor(index / 3) * 4;
			var end = Math.ceil((index + length) / 3) * 4;
			var bytes = obj.atob(dataURI.substring(start + dataStart, end + dataStart));
			var delta = index - Math.floor(start / 4) * 3;
			for (i = delta; i < delta + length; i++)
				data.array[i - delta] = bytes.charCodeAt(i);
			callback(data.array);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	Data64URIReader.prototype = new Reader();
	Data64URIReader.prototype.constructor = Data64URIReader;

	function BlobReader(blob) {
		var that = this;

		function init(callback) {
			this.size = blob.size;
			callback();
		}

		function readUint8Array(index, length, callback, onerror) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(new Uint8Array(e.target.result));
			};
			reader.onerror = onerror;
			reader.readAsArrayBuffer(blobSlice(blob, index, length));
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	BlobReader.prototype = new Reader();
	BlobReader.prototype.constructor = BlobReader;

	function HttpReader(url) {
		var that = this;

		function getData(callback, onerror) {
			var request;
			if (!that.data) {
				request = new XMLHttpRequest();
				request.addEventListener("load", function() {
					if (!that.size)
						that.size = Number(request.getResponseHeader("Content-Length"));
					that.data = new Uint8Array(request.response);
					callback();
				}, false);
				request.addEventListener("error", onerror, false);
				request.open("GET", url);
				request.responseType = "arraybuffer";
				request.send();
			} else
				callback();
		}

		function init(callback, onerror) {
			var request = new XMLHttpRequest();
			request.addEventListener("load", function() {
				that.size = Number(request.getResponseHeader("Content-Length"));
				callback();
			}, false);
			request.addEventListener("error", onerror, false);
			request.open("HEAD", url);
			request.send();
		}

		function readUint8Array(index, length, callback, onerror) {
			getData(function() {
				callback(new Uint8Array(that.data.subarray(index, index + length)));
			}, onerror);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	HttpReader.prototype = new Reader();
	HttpReader.prototype.constructor = HttpReader;

	function HttpRangeReader(url) {
		var that = this;

		function init(callback, onerror) {
			var request = new XMLHttpRequest();
			request.addEventListener("load", function() {
				that.size = Number(request.getResponseHeader("Content-Length"));
				if (request.getResponseHeader("Accept-Ranges") == "bytes")
					callback();
				else
					onerror(ERR_HTTP_RANGE);
			}, false);
			request.addEventListener("error", onerror, false);
			request.open("HEAD", url);
			request.send();
		}

		function readArrayBuffer(index, length, callback, onerror) {
			var request = new XMLHttpRequest();
			request.open("GET", url);
			request.responseType = "arraybuffer";
			request.setRequestHeader("Range", "bytes=" + index + "-" + (index + length - 1));
			request.addEventListener("load", function() {
				callback(request.response);
			}, false);
			request.addEventListener("error", onerror, false);
			request.send();
		}

		function readUint8Array(index, length, callback, onerror) {
			readArrayBuffer(index, length, function(arraybuffer) {
				callback(new Uint8Array(arraybuffer));
			}, onerror);
		}

		that.size = 0;
		that.init = init;
		that.readUint8Array = readUint8Array;
	}
	HttpRangeReader.prototype = new Reader();
	HttpRangeReader.prototype.constructor = HttpRangeReader;

	// Writers

	function Writer() {
	}
	Writer.prototype.getData = function(callback) {
		callback(this.data);
	};

	function TextWriter() {
		var that = this, blob;

		function init(callback) {
			blob = new Blob([], {
				type : "text/plain"
			});
			callback();
		}

		function writeUint8Array(array, callback) {
			blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
				type : "text/plain"
			});
			callback();
		}

		function getData(callback, onerror) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(e.target.result);
			};
			reader.onerror = onerror;
			reader.readAsText(blob);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	TextWriter.prototype = new Writer();
	TextWriter.prototype.constructor = TextWriter;

	function Data64URIWriter(contentType) {
		var that = this, data = "", pending = "";

		function init(callback) {
			data += "data:" + (contentType || "") + ";base64,";
			callback();
		}

		function writeUint8Array(array, callback) {
			var i, delta = pending.length, dataString = pending;
			pending = "";
			for (i = 0; i < (Math.floor((delta + array.length) / 3) * 3) - delta; i++)
				dataString += String.fromCharCode(array[i]);
			for (; i < array.length; i++)
				pending += String.fromCharCode(array[i]);
			if (dataString.length > 2)
				data += obj.btoa(dataString);
			else
				pending = dataString;
			callback();
		}

		function getData(callback) {
			callback(data + obj.btoa(pending));
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	Data64URIWriter.prototype = new Writer();
	Data64URIWriter.prototype.constructor = Data64URIWriter;

	function FileWriter(fileEntry, contentType) {
		var writer, that = this;

		function init(callback, onerror) {
			fileEntry.createWriter(function(fileWriter) {
				writer = fileWriter;
				callback();
			}, onerror);
		}

		function writeUint8Array(array, callback, onerror) {
			var blob = new Blob([ appendABViewSupported ? array : array.buffer ], {
				type : contentType
			});
			writer.onwrite = function() {
				writer.onwrite = null;
				callback();
			};
			writer.onerror = onerror;
			writer.write(blob);
		}

		function getData(callback) {
			fileEntry.file(callback);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	FileWriter.prototype = new Writer();
	FileWriter.prototype.constructor = FileWriter;

	function BlobWriter(contentType) {
		var blob, that = this;

		function init(callback) {
			blob = new Blob([], {
				type : contentType
			});
			callback();
		}

		function writeUint8Array(array, callback) {
			blob = new Blob([ blob, appendABViewSupported ? array : array.buffer ], {
				type : contentType
			});
			callback();
		}

		function getData(callback) {
			callback(blob);
		}

		that.init = init;
		that.writeUint8Array = writeUint8Array;
		that.getData = getData;
	}
	BlobWriter.prototype = new Writer();
	BlobWriter.prototype.constructor = BlobWriter;

	// inflate/deflate core functions

	function launchWorkerProcess(worker, reader, writer, offset, size, onappend, onprogress, onend, onreaderror, onwriteerror) {
		var chunkIndex = 0, index, outputSize;

		function onflush() {
			worker.removeEventListener("message", onmessage, false);
			onend(outputSize);
		}

		function onmessage(event) {
			var message = event.data, data = message.data;

			if (message.onappend) {
				outputSize += data.length;
				writer.writeUint8Array(data, function() {
					onappend(false, data);
					step();
				}, onwriteerror);
			}
			if (message.onflush)
				if (data) {
					outputSize += data.length;
					writer.writeUint8Array(data, function() {
						onappend(false, data);
						onflush();
					}, onwriteerror);
				} else
					onflush();
			if (message.progress && onprogress)
				onprogress(index + message.current, size);
		}

		function step() {
			index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(array) {
					worker.postMessage({
						append : true,
						data : array
					});
					chunkIndex++;
					if (onprogress)
						onprogress(index, size);
					onappend(true, array);
				}, onreaderror);
			else
				worker.postMessage({
					flush : true
				});
		}

		outputSize = 0;
		worker.addEventListener("message", onmessage, false);
		step();
	}

	function launchProcess(process, reader, writer, offset, size, onappend, onprogress, onend, onreaderror, onwriteerror) {
		var chunkIndex = 0, index, outputSize = 0;

		function step() {
			var outputData;
			index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(inputData) {
					var outputData = process.append(inputData, function() {
						if (onprogress)
							onprogress(offset + index, size);
					});
					outputSize += outputData.length;
					onappend(true, inputData);
					writer.writeUint8Array(outputData, function() {
						onappend(false, outputData);
						chunkIndex++;
						setTimeout(step, 1);
					}, onwriteerror);
					if (onprogress)
						onprogress(index, size);
				}, onreaderror);
			else {
				outputData = process.flush();
				if (outputData) {
					outputSize += outputData.length;
					writer.writeUint8Array(outputData, function() {
						onappend(false, outputData);
						onend(outputSize);
					}, onwriteerror);
				} else
					onend(outputSize);
			}
		}

		step();
	}

	function inflate(reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
		var worker, crc32 = new Crc32();

		function oninflateappend(sending, array) {
			if (computeCrc32 && !sending)
				crc32.append(array);
		}

		function oninflateend(outputSize) {
			onend(outputSize, crc32.get());
		}

		if (obj.zip.useWebWorkers) {
			worker = new Worker(obj.zip.workerScriptsPath + INFLATE_JS);
			launchWorkerProcess(worker, reader, writer, offset, size, oninflateappend, onprogress, oninflateend, onreaderror, onwriteerror);
		} else
			launchProcess(new obj.zip.Inflater(), reader, writer, offset, size, oninflateappend, onprogress, oninflateend, onreaderror, onwriteerror);
		return worker;
	}

	function deflate(reader, writer, level, onend, onprogress, onreaderror, onwriteerror) {
		var worker, crc32 = new Crc32();

		function ondeflateappend(sending, array) {
			if (sending)
				crc32.append(array);
		}

		function ondeflateend(outputSize) {
			onend(outputSize, crc32.get());
		}

		function onmessage() {
			worker.removeEventListener("message", onmessage, false);
			launchWorkerProcess(worker, reader, writer, 0, reader.size, ondeflateappend, onprogress, ondeflateend, onreaderror, onwriteerror);
		}

		if (obj.zip.useWebWorkers) {
			worker = new Worker(obj.zip.workerScriptsPath + DEFLATE_JS);
			worker.addEventListener("message", onmessage, false);
			worker.postMessage({
				init : true,
				level : level
			});
		} else
			launchProcess(new obj.zip.Deflater(), reader, writer, 0, reader.size, ondeflateappend, onprogress, ondeflateend, onreaderror, onwriteerror);
		return worker;
	}

	function copy(reader, writer, offset, size, computeCrc32, onend, onprogress, onreaderror, onwriteerror) {
		var chunkIndex = 0, crc32 = new Crc32();

		function step() {
			var index = chunkIndex * CHUNK_SIZE;
			if (index < size)
				reader.readUint8Array(offset + index, Math.min(CHUNK_SIZE, size - index), function(array) {
					if (computeCrc32)
						crc32.append(array);
					if (onprogress)
						onprogress(index, size, array);
					writer.writeUint8Array(array, function() {
						chunkIndex++;
						step();
					}, onwriteerror);
				}, onreaderror);
			else
				onend(size, crc32.get());
		}

		step();
	}

	// ZipReader

	function decodeASCII(str) {
		var i, out = "", charCode, extendedASCII = [ '\u00C7', '\u00FC', '\u00E9', '\u00E2', '\u00E4', '\u00E0', '\u00E5', '\u00E7', '\u00EA', '\u00EB',
				'\u00E8', '\u00EF', '\u00EE', '\u00EC', '\u00C4', '\u00C5', '\u00C9', '\u00E6', '\u00C6', '\u00F4', '\u00F6', '\u00F2', '\u00FB', '\u00F9',
				'\u00FF', '\u00D6', '\u00DC', '\u00F8', '\u00A3', '\u00D8', '\u00D7', '\u0192', '\u00E1', '\u00ED', '\u00F3', '\u00FA', '\u00F1', '\u00D1',
				'\u00AA', '\u00BA', '\u00BF', '\u00AE', '\u00AC', '\u00BD', '\u00BC', '\u00A1', '\u00AB', '\u00BB', '_', '_', '_', '\u00A6', '\u00A6',
				'\u00C1', '\u00C2', '\u00C0', '\u00A9', '\u00A6', '\u00A6', '+', '+', '\u00A2', '\u00A5', '+', '+', '-', '-', '+', '-', '+', '\u00E3',
				'\u00C3', '+', '+', '-', '-', '\u00A6', '-', '+', '\u00A4', '\u00F0', '\u00D0', '\u00CA', '\u00CB', '\u00C8', 'i', '\u00CD', '\u00CE',
				'\u00CF', '+', '+', '_', '_', '\u00A6', '\u00CC', '_', '\u00D3', '\u00DF', '\u00D4', '\u00D2', '\u00F5', '\u00D5', '\u00B5', '\u00FE',
				'\u00DE', '\u00DA', '\u00DB', '\u00D9', '\u00FD', '\u00DD', '\u00AF', '\u00B4', '\u00AD', '\u00B1', '_', '\u00BE', '\u00B6', '\u00A7',
				'\u00F7', '\u00B8', '\u00B0', '\u00A8', '\u00B7', '\u00B9', '\u00B3', '\u00B2', '_', ' ' ];
		for (i = 0; i < str.length; i++) {
			charCode = str.charCodeAt(i) & 0xFF;
			if (charCode > 127)
				out += extendedASCII[charCode - 128];
			else
				out += String.fromCharCode(charCode);
		}
		return out;
	}

	function decodeUTF8(str_data) {
		var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;

		str_data += '';

		while (i < str_data.length) {
			c1 = str_data.charCodeAt(i);
			if (c1 < 128) {
				tmp_arr[ac++] = String.fromCharCode(c1);
				i++;
			} else if (c1 > 191 && c1 < 224) {
				c2 = str_data.charCodeAt(i + 1);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = str_data.charCodeAt(i + 1);
				c3 = str_data.charCodeAt(i + 2);
				tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}

		return tmp_arr.join('');
	}

	function getString(bytes) {
		var i, str = "";
		for (i = 0; i < bytes.length; i++)
			str += String.fromCharCode(bytes[i]);
		return str;
	}

	function getDate(timeRaw) {
		var date = (timeRaw & 0xffff0000) >> 16, time = timeRaw & 0x0000ffff;
		try {
			return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5,
					(time & 0x001F) * 2, 0);
		} catch (e) {
		}
	}

	function readCommonHeader(entry, data, index, centralDirectory, onerror) {
		entry.version = data.view.getUint16(index, true);
		entry.bitFlag = data.view.getUint16(index + 2, true);
		entry.compressionMethod = data.view.getUint16(index + 4, true);
		entry.lastModDateRaw = data.view.getUint32(index + 6, true);
		entry.lastModDate = getDate(entry.lastModDateRaw);
		if ((entry.bitFlag & 0x01) === 0x01) {
			onerror(ERR_ENCRYPTED);
			return;
		}
		if (centralDirectory || (entry.bitFlag & 0x0008) != 0x0008) {
			entry.crc32 = data.view.getUint32(index + 10, true);
			entry.compressedSize = data.view.getUint32(index + 14, true);
			entry.uncompressedSize = data.view.getUint32(index + 18, true);
		}
		if (entry.compressedSize === 0xFFFFFFFF || entry.uncompressedSize === 0xFFFFFFFF) {
			onerror(ERR_ZIP64);
			return;
		}
		entry.filenameLength = data.view.getUint16(index + 22, true);
		entry.extraFieldLength = data.view.getUint16(index + 24, true);
	}

	function createZipReader(reader, onerror) {
		function Entry() {
		}

		Entry.prototype.getData = function(writer, onend, onprogress, checkCrc32) {
			var that = this, worker;

			function terminate(callback, param) {
				if (worker)
					worker.terminate();
				worker = null;
				if (callback)
					callback(param);
			}

			function testCrc32(crc32) {
				var dataCrc32 = getDataHelper(4);
				dataCrc32.view.setUint32(0, crc32);
				return that.crc32 == dataCrc32.view.getUint32(0);
			}

			function getWriterData(uncompressedSize, crc32) {
				if (checkCrc32 && !testCrc32(crc32))
					onreaderror();
				else
					writer.getData(function(data) {
						terminate(onend, data);
					});
			}

			function onreaderror() {
				terminate(onerror, ERR_READ_DATA);
			}

			function onwriteerror() {
				terminate(onerror, ERR_WRITE_DATA);
			}

			reader.readUint8Array(that.offset, 30, function(bytes) {
				var data = getDataHelper(bytes.length, bytes), dataOffset;
				if (data.view.getUint32(0) != 0x504b0304) {
					onerror(ERR_BAD_FORMAT);
					return;
				}
				readCommonHeader(that, data, 4, false, function(error) {
					onerror(error);
					return;
				});
				dataOffset = that.offset + 30 + that.filenameLength + that.extraFieldLength;
				writer.init(function() {
					if (that.compressionMethod === 0)
						copy(reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
					else
						worker = inflate(reader, writer, dataOffset, that.compressedSize, checkCrc32, getWriterData, onprogress, onreaderror, onwriteerror);
				}, onwriteerror);
			}, onreaderror);
		};

		function seekEOCDR(offset, entriesCallback) {
			reader.readUint8Array(reader.size - offset, offset, function(bytes) {
				var dataView = getDataHelper(bytes.length, bytes).view;
				if (dataView.getUint32(0) != 0x504b0506) {
					seekEOCDR(offset + 1, entriesCallback);
				} else {
					entriesCallback(dataView);
				}
			}, function() {
				onerror(ERR_READ);
			});
		}

		return {
			getEntries : function(callback) {
				if (reader.size < 22) {
					onerror(ERR_BAD_FORMAT);
					return;
				}
				// look for End of central directory record
				seekEOCDR(22, function(dataView) {
					var datalength, fileslength;
					datalength = dataView.getUint32(16, true);
					fileslength = dataView.getUint16(8, true);
					reader.readUint8Array(datalength, reader.size - datalength, function(bytes) {
						var i, index = 0, entries = [], entry, filename, comment, data = getDataHelper(bytes.length, bytes);
						for (i = 0; i < fileslength; i++) {
							entry = new Entry();
							if (data.view.getUint32(index) != 0x504b0102) {
								onerror(ERR_BAD_FORMAT);
								return;
							}
							readCommonHeader(entry, data, index + 6, true, function(error) {
								onerror(error);
								return;
							});
							entry.commentLength = data.view.getUint16(index + 32, true);
							entry.directory = ((data.view.getUint8(index + 38) & 0x10) == 0x10);
							entry.offset = data.view.getUint32(index + 42, true);
							filename = getString(data.array.subarray(index + 46, index + 46 + entry.filenameLength));
							entry.filename = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(filename) : decodeASCII(filename);
							if (!entry.directory && entry.filename.charAt(entry.filename.length - 1) == "/")
								entry.directory = true;
							comment = getString(data.array.subarray(index + 46 + entry.filenameLength + entry.extraFieldLength, index + 46
									+ entry.filenameLength + entry.extraFieldLength + entry.commentLength));
							entry.comment = ((entry.bitFlag & 0x0800) === 0x0800) ? decodeUTF8(comment) : decodeASCII(comment);
							entries.push(entry);
							index += 46 + entry.filenameLength + entry.extraFieldLength + entry.commentLength;
						}
						callback(entries);
					}, function() {
						onerror(ERR_READ);
					});
				});
			},
			close : function(callback) {
				if (callback)
					callback();
			}
		};
	}

	// ZipWriter

	function encodeUTF8(string) {
		var n, c1, enc, utftext = [], start = 0, end = 0, stringl = string.length;
		for (n = 0; n < stringl; n++) {
			c1 = string.charCodeAt(n);
			enc = null;
			if (c1 < 128)
				end++;
			else if (c1 > 127 && c1 < 2048)
				enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
			else
				enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
			if (enc != null) {
				if (end > start)
					utftext += string.slice(start, end);
				utftext += enc;
				start = end = n + 1;
			}
		}
		if (end > start)
			utftext += string.slice(start, stringl);
		return utftext;
	}

	function getBytes(str) {
		var i, array = [];
		for (i = 0; i < str.length; i++)
			array.push(str.charCodeAt(i));
		return array;
	}

	function createZipWriter(writer, onerror, dontDeflate) {
		var worker, files = [], filenames = [], datalength = 0;

		function terminate(callback, message) {
			if (worker)
				worker.terminate();
			worker = null;
			if (callback)
				callback(message);
		}

		function onwriteerror() {
			terminate(onerror, ERR_WRITE);
		}

		function onreaderror() {
			terminate(onerror, ERR_READ_DATA);
		}

		return {
			add : function(name, reader, onend, onprogress, options) {
				var header, filename, date;

				function writeHeader(callback) {
					var data;
					date = options.lastModDate || new Date();
					header = getDataHelper(26);
					files[name] = {
						headerArray : header.array,
						directory : options.directory,
						filename : filename,
						offset : datalength,
						comment : getBytes(encodeUTF8(options.comment || ""))
					};
					header.view.setUint32(0, 0x14000808);
					if (options.version)
						header.view.setUint8(0, options.version);
					if (!dontDeflate && options.level != 0 && !options.directory)
						header.view.setUint16(4, 0x0800);
					header.view.setUint16(6, (((date.getHours() << 6) | date.getMinutes()) << 5) | date.getSeconds() / 2, true);
					header.view.setUint16(8, ((((date.getFullYear() - 1980) << 4) | (date.getMonth() + 1)) << 5) | date.getDate(), true);
					header.view.setUint16(22, filename.length, true);
					data = getDataHelper(30 + filename.length);
					data.view.setUint32(0, 0x504b0304);
					data.array.set(header.array, 4);
					data.array.set(filename, 30);
					datalength += data.array.length;
					writer.writeUint8Array(data.array, callback, onwriteerror);
				}

				function writeFooter(compressedLength, crc32) {
					var footer = getDataHelper(16);
					datalength += compressedLength || 0;
					footer.view.setUint32(0, 0x504b0708);
					if (typeof crc32 != "undefined") {
						header.view.setUint32(10, crc32, true);
						footer.view.setUint32(4, crc32, true);
					}
					if (reader) {
						footer.view.setUint32(8, compressedLength, true);
						header.view.setUint32(14, compressedLength, true);
						footer.view.setUint32(12, reader.size, true);
						header.view.setUint32(18, reader.size, true);
					}
					writer.writeUint8Array(footer.array, function() {
						datalength += 16;
						terminate(onend);
					}, onwriteerror);
				}

				function writeFile() {
					options = options || {};
					name = name.trim();
					if (options.directory && name.charAt(name.length - 1) != "/")
						name += "/";
					if (files[name])
						throw ERR_DUPLICATED_NAME;
					filename = getBytes(encodeUTF8(name));
					filenames.push(name);
					writeHeader(function() {
						if (reader)
							if (dontDeflate || options.level == 0)
								copy(reader, writer, 0, reader.size, true, writeFooter, onprogress, onreaderror, onwriteerror);
							else
								worker = deflate(reader, writer, options.level, writeFooter, onprogress, onreaderror, onwriteerror);
						else
							writeFooter();
					}, onwriteerror);
				}

				if (reader)
					reader.init(writeFile, onreaderror);
				else
					writeFile();
			},
			close : function(callback) {
				var data, length = 0, index = 0;
				filenames.forEach(function(name) {
					var file = files[name];
					length += 46 + file.filename.length + file.comment.length;
				});
				data = getDataHelper(length + 22);
				filenames.forEach(function(name) {
					var file = files[name];
					data.view.setUint32(index, 0x504b0102);
					data.view.setUint16(index + 4, 0x1400);
					data.array.set(file.headerArray, index + 6);
					data.view.setUint16(index + 32, file.comment.length, true);
					if (file.directory)
						data.view.setUint8(index + 38, 0x10);
					data.view.setUint32(index + 42, file.offset, true);
					data.array.set(file.filename, index + 46);
					data.array.set(file.comment, index + 46 + file.filename.length);
					index += 46 + file.filename.length + file.comment.length;
				});
				data.view.setUint32(index, 0x504b0506);
				data.view.setUint16(index + 8, filenames.length, true);
				data.view.setUint16(index + 10, filenames.length, true);
				data.view.setUint32(index + 12, length, true);
				data.view.setUint32(index + 16, datalength, true);
				writer.writeUint8Array(data.array, function() {
					terminate(function() {
						writer.getData(callback);
					});
				}, onwriteerror);
			}
		};
	}

	obj.zip = {
		Reader : Reader,
		Writer : Writer,
		BlobReader : BlobReader,
		HttpReader : HttpReader,
		HttpRangeReader : HttpRangeReader,
		Data64URIReader : Data64URIReader,
		TextReader : TextReader,
		BlobWriter : BlobWriter,
		FileWriter : FileWriter,
		Data64URIWriter : Data64URIWriter,
		TextWriter : TextWriter,
		createReader : function(reader, callback, onerror) {
			reader.init(function() {
				callback(createZipReader(reader, onerror));
			}, onerror);
		},
		createWriter : function(writer, callback, onerror, dontDeflate) {
			writer.init(function() {
				callback(createZipWriter(writer, onerror, dontDeflate));
			}, onerror);
		},
		workerScriptsPath : "",
		useWebWorkers : true
	};

})(this);
/*!
 Copyright (c) 2013 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

!function(a){function b(){var a=-1,b=this;b.append=function(c){var d,e=b.table;for(d=0;d<c.length;d++)a=a>>>8^e[255&(a^c[d])]},b.get=function(){return~a}}function c(a,b,c){return a.slice?a.slice(b,b+c):a.webkitSlice?a.webkitSlice(b,b+c):a.mozSlice?a.mozSlice(b,b+c):a.msSlice?a.msSlice(b,b+c):void 0}function d(a,b){var c,d;return c=new ArrayBuffer(a),d=new Uint8Array(c),b&&d.set(b,0),{buffer:c,array:d,view:new DataView(c)}}function e(){}function f(a){function b(b,c){var f=new Blob([a],{type:M});d=new h(f),d.init(function(){e.size=d.size,b()},c)}function c(a,b,c,e){d.readUint8Array(a,b,c,e)}var d,e=this;e.size=0,e.init=b,e.readUint8Array=c}function g(b){function c(a){for(var c=b.length;"="==b.charAt(c-1);)c--;f=b.indexOf(",")+1,g.size=Math.floor(.75*(c-f)),a()}function e(c,e,g){var h,i=d(e),j=4*Math.floor(c/3),k=4*Math.ceil((c+e)/3),l=a.atob(b.substring(j+f,k+f)),m=c-3*Math.floor(j/4);for(h=m;m+e>h;h++)i.array[h-m]=l.charCodeAt(h);g(i.array)}var f,g=this;g.size=0,g.init=c,g.readUint8Array=e}function h(a){function b(b){this.size=a.size,b()}function d(b,d,e,f){var g=new FileReader;g.onload=function(a){e(new Uint8Array(a.target.result))},g.onerror=f,g.readAsArrayBuffer(c(a,b,d))}var e=this;e.size=0,e.init=b,e.readUint8Array=d}function i(){}function j(a){function b(a){e=new Blob([],{type:M}),a()}function c(a,b){e=new Blob([e,A?a:a.buffer],{type:M}),b()}function d(b,c){var d=new FileReader;d.onload=function(a){b(a.target.result)},d.onerror=c,d.readAsText(e,a)}var e,f=this;f.init=b,f.writeUint8Array=c,f.getData=d}function k(b){function c(a){g+="data:"+(b||"")+";base64,",a()}function d(b,c){var d,e=h.length,f=h;for(h="",d=0;d<3*Math.floor((e+b.length)/3)-e;d++)f+=String.fromCharCode(b[d]);for(;d<b.length;d++)h+=String.fromCharCode(b[d]);f.length>2?g+=a.btoa(f):h=f,c()}function e(b){b(g+a.btoa(h))}var f=this,g="",h="";f.init=c,f.writeUint8Array=d,f.getData=e}function l(a){function b(b){e=new Blob([],{type:a}),b()}function c(b,c){e=new Blob([e,A?b:b.buffer],{type:a}),c()}function d(a){a(e)}var e,f=this;f.init=b,f.writeUint8Array=c,f.getData=d}function m(a,b,c,d,e,f,g,h,i,j){function k(){a.removeEventListener(N,l,!1),h(o)}function l(a){var b=a.data,d=b.data;b.onappend&&(o+=d.length,c.writeUint8Array(d,function(){f(!1,d),m()},j)),b.onflush&&(d?(o+=d.length,c.writeUint8Array(d,function(){f(!1,d),k()},j)):k()),b.progress&&g&&g(n+b.current,e)}function m(){n=p*J,e>n?b.readUint8Array(d+n,Math.min(J,e-n),function(b){a.postMessage({append:!0,data:b}),p++,g&&g(n,e),f(!0,b)},i):a.postMessage({flush:!0})}var n,o,p=0;o=0,a.addEventListener(N,l,!1),m()}function n(a,b,c,d,e,f,g,h,i,j){function k(){var o;l=m*J,e>l?b.readUint8Array(d+l,Math.min(J,e-l),function(b){var h=a.append(b,function(){g&&g(d+l,e)});n+=h.length,f(!0,b),c.writeUint8Array(h,function(){f(!1,h),m++,setTimeout(k,1)},j),g&&g(l,e)},i):(o=a.flush(),o?(n+=o.length,c.writeUint8Array(o,function(){f(!1,o),h(n)},j)):h(n))}var l,m=0,n=0;k()}function o(c,d,e,f,g,h,i,j,k){function l(a,b){g&&!a&&q.append(b)}function o(a){h(a,q.get())}var p,q=new b;return a.zip.useWebWorkers?(p=new Worker(a.zip.workerScriptsPath+K),m(p,c,d,e,f,l,i,o,j,k)):n(new a.zip.Inflater,c,d,e,f,l,i,o,j,k),p}function p(c,d,e,f,g,h,i){function j(a,b){a&&p.append(b)}function k(a){f(a,p.get())}function l(){o.removeEventListener(N,l,!1),m(o,c,d,0,c.size,j,g,k,h,i)}var o,p=new b;return a.zip.useWebWorkers?(o=new Worker(a.zip.workerScriptsPath+L),o.addEventListener(N,l,!1),o.postMessage({init:!0,level:e})):n(new a.zip.Deflater,c,d,0,c.size,j,g,k,h,i),o}function q(a,c,d,e,f,g,h,i,j){function k(){var b=l*J;e>b?a.readUint8Array(d+b,Math.min(J,e-b),function(a){f&&m.append(a),h&&h(b,e,a),c.writeUint8Array(a,function(){l++,k()},j)},i):g(e,m.get())}var l=0,m=new b;k()}function r(a){var b,c,d="",e=["Ç","ü","é","â","ä","à","å","ç","ê","ë","è","ï","î","ì","Ä","Å","É","æ","Æ","ô","ö","ò","û","ù","ÿ","Ö","Ü","ø","£","Ø","×","ƒ","á","í","ó","ú","ñ","Ñ","ª","º","¿","®","¬","½","¼","¡","«","»","_","_","_","¦","¦","Á","Â","À","©","¦","¦","+","+","¢","¥","+","+","-","-","+","-","+","ã","Ã","+","+","-","-","¦","-","+","¤","ð","Ð","Ê","Ë","È","i","Í","Î","Ï","+","+","_","_","¦","Ì","_","Ó","ß","Ô","Ò","õ","Õ","µ","þ","Þ","Ú","Û","Ù","ý","Ý","¯","´","­","±","_","¾","¶","§","÷","¸","°","¨","·","¹","³","²","_"," "];for(b=0;b<a.length;b++)c=255&a.charCodeAt(b),d+=c>127?e[c-128]:String.fromCharCode(c);return d}function s(a){return decodeURIComponent(escape(a))}function t(a){var b,c="";for(b=0;b<a.length;b++)c+=String.fromCharCode(a[b]);return c}function u(a){var b=(4294901760&a)>>16,c=65535&a;try{return new Date(1980+((65024&b)>>9),((480&b)>>5)-1,31&b,(63488&c)>>11,(2016&c)>>5,2*(31&c),0)}catch(d){}}function v(a,b,c,d,e){return a.version=b.view.getUint16(c,!0),a.bitFlag=b.view.getUint16(c+2,!0),a.compressionMethod=b.view.getUint16(c+4,!0),a.lastModDateRaw=b.view.getUint32(c+6,!0),a.lastModDate=u(a.lastModDateRaw),1===(1&a.bitFlag)?void e(C):((d||8!=(8&a.bitFlag))&&(a.crc32=b.view.getUint32(c+10,!0),a.compressedSize=b.view.getUint32(c+14,!0),a.uncompressedSize=b.view.getUint32(c+18,!0)),4294967295===a.compressedSize||4294967295===a.uncompressedSize?void e(D):(a.filenameLength=b.view.getUint16(c+22,!0),void(a.extraFieldLength=b.view.getUint16(c+24,!0))))}function w(a,b){function c(){}function e(c,f){a.readUint8Array(a.size-c,c,function(a){var b=d(a.length,a).view;1347093766!=b.getUint32(0)?e(c+1,f):f(b)},function(){b(E)})}return c.prototype.getData=function(c,e,f,g){function h(a,b){m&&m.terminate(),m=null,a&&a(b)}function i(a){var b=d(4);return b.view.setUint32(0,a),n.crc32==b.view.getUint32(0)}function j(a,b){g&&!i(b)?k():c.getData(function(a){h(e,a)})}function k(){h(b,H)}function l(){h(b,G)}var m,n=this;a.readUint8Array(n.offset,30,function(e){var h,i=d(e.length,e);return 1347093252!=i.view.getUint32(0)?void b(B):(v(n,i,4,!1,b),h=n.offset+30+n.filenameLength+n.extraFieldLength,void c.init(function(){0===n.compressionMethod?q(a,c,h,n.compressedSize,g,j,f,k,l):m=o(a,c,h,n.compressedSize,g,j,f,k,l)},l))},k)},{getEntries:function(f){return a.size<22?void b(B):void e(22,function(e){var g,h;g=e.getUint32(16,!0),h=e.getUint16(8,!0),a.readUint8Array(g,a.size-g,function(a){var e,g,i,j,k=0,l=[],m=d(a.length,a);for(e=0;h>e;e++){if(g=new c,1347092738!=m.view.getUint32(k))return void b(B);v(g,m,k+6,!0,b),g.commentLength=m.view.getUint16(k+32,!0),g.directory=16==(16&m.view.getUint8(k+38)),g.offset=m.view.getUint32(k+42,!0),i=t(m.array.subarray(k+46,k+46+g.filenameLength)),g.filename=2048===(2048&g.bitFlag)?s(i):r(i),g.directory||"/"!=g.filename.charAt(g.filename.length-1)||(g.directory=!0),j=t(m.array.subarray(k+46+g.filenameLength+g.extraFieldLength,k+46+g.filenameLength+g.extraFieldLength+g.commentLength)),g.comment=2048===(2048&g.bitFlag)?s(j):r(j),l.push(g),k+=46+g.filenameLength+g.extraFieldLength+g.commentLength}f(l)},function(){b(E)})})},close:function(a){a&&a()}}}function x(a){return unescape(encodeURIComponent(a))}function y(a){var b,c=[];for(b=0;b<a.length;b++)c.push(a.charCodeAt(b));return c}function z(a,b,c){function e(a,b){h&&h.terminate(),h=null,a&&a(b)}function f(){e(b,F)}function g(){e(b,H)}var h,i={},j=[],k=0;return{add:function(l,m,n,o,r){function s(b){var e;z=r.lastModDate||new Date,v=d(26),i[l]={headerArray:v.array,directory:r.directory,filename:w,offset:k,comment:y(x(r.comment||""))},v.view.setUint32(0,335546376),r.version&&v.view.setUint8(0,r.version),c||0===r.level||r.directory||v.view.setUint16(4,2048),v.view.setUint16(6,(z.getHours()<<6|z.getMinutes())<<5|z.getSeconds()/2,!0),v.view.setUint16(8,(z.getFullYear()-1980<<4|z.getMonth()+1)<<5|z.getDate(),!0),v.view.setUint16(22,w.length,!0),e=d(30+w.length),e.view.setUint32(0,1347093252),e.array.set(v.array,4),e.array.set(w,30),k+=e.array.length,a.writeUint8Array(e.array,b,f)}function t(b,c){var g=d(16);k+=b||0,g.view.setUint32(0,1347094280),"undefined"!=typeof c&&(v.view.setUint32(10,c,!0),g.view.setUint32(4,c,!0)),m&&(g.view.setUint32(8,b,!0),v.view.setUint32(14,b,!0),g.view.setUint32(12,m.size,!0),v.view.setUint32(18,m.size,!0)),a.writeUint8Array(g.array,function(){k+=16,e(n)},f)}function u(){return r=r||{},l=l.trim(),r.directory&&"/"!=l.charAt(l.length-1)&&(l+="/"),i.hasOwnProperty(l)?void b(I):(w=y(x(l)),j.push(l),void s(function(){m?c||0===r.level?q(m,a,0,m.size,!0,t,o,g,f):h=p(m,a,r.level,t,o,g,f):t()},f))}var v,w,z;m?m.init(u,g):u()},close:function(b){var c,g,h,l=0,m=0;for(g=0;g<j.length;g++)h=i[j[g]],l+=46+h.filename.length+h.comment.length;for(c=d(l+22),g=0;g<j.length;g++)h=i[j[g]],c.view.setUint32(m,1347092738),c.view.setUint16(m+4,5120),c.array.set(h.headerArray,m+6),c.view.setUint16(m+32,h.comment.length,!0),h.directory&&c.view.setUint8(m+38,16),c.view.setUint32(m+42,h.offset,!0),c.array.set(h.filename,m+46),c.array.set(h.comment,m+46+h.filename.length),m+=46+h.filename.length+h.comment.length;c.view.setUint32(m,1347093766),c.view.setUint16(m+8,j.length,!0),c.view.setUint16(m+10,j.length,!0),c.view.setUint32(m+12,l,!0),c.view.setUint32(m+16,k,!0),a.writeUint8Array(c.array,function(){e(function(){a.getData(b)})},f)}}}var A,B="File format is not recognized.",C="File contains encrypted entry.",D="File is using Zip64 (4gb+ file size).",E="Error while reading zip file.",F="Error while writing zip file.",G="Error while writing file data.",H="Error while reading file data.",I="File already exists.",J=524288,K="inflate.js",L="deflate.js",M="text/plain",N="message";try{A=0===new Blob([new DataView(new ArrayBuffer(0))]).size}catch(O){}b.prototype.table=function(){var a,b,c,d=[];for(a=0;256>a;a++){for(c=a,b=0;8>b;b++)1&c?c=c>>>1^3988292384:c>>>=1;d[a]=c}return d}(),f.prototype=new e,f.prototype.constructor=f,g.prototype=new e,g.prototype.constructor=g,h.prototype=new e,h.prototype.constructor=h,i.prototype.getData=function(a){a(this.data)},j.prototype=new i,j.prototype.constructor=j,k.prototype=new i,k.prototype.constructor=k,l.prototype=new i,l.prototype.constructor=l,a.zip={Reader:e,Writer:i,BlobReader:h,Data64URIReader:g,TextReader:f,BlobWriter:l,Data64URIWriter:k,TextWriter:j,createReader:function(a,b,c){a.init(function(){b(w(a,c))},c)},createWriter:function(a,b,c,d){a.init(function(){b(z(a,c,d))},c)},workerScriptsPath:"",useWebWorkers:!0}}(this),function(){function a(a){function b(b){this.size=a.uncompressedSize,b()}function c(b){f.data?b():a.getData(new r,function(a){f.data=a,e=new v(a),b()},null,f.checkCrc32)}function d(a,b,d,f){c(function(){e.readUint8Array(a,b,d,f)},f)}var e,f=this;f.size=0,f.init=b,f.readUint8Array=d}function b(a){function b(a){c+=a.uncompressedSize||0,a.children.forEach(b)}var c=0;return b(a),c}function c(a,b,d){function e(){g++,g<a.children.length?f(a.children[g]):b()}function f(a){a.directory?c(a,e,d):(a.reader=new a.Reader(a.data,d),a.reader.init(function(){a.uncompressedSize=a.reader.size,e()}))}var g=0;a.children.length?f(a.children[g]):b()}function d(a){var b=a.parent.children;b.forEach(function(c,d){c.id==a.id&&b.splice(d,1)})}function e(a,b,c,d,e){function f(a,b,c,d,e){function h(){var j=b.children[i];j?a.add(j.getFullname(),j.reader,function(){g+=j.uncompressedSize||0,f(a,j,function(){i++,h()},d,e)},function(a){d&&d(g+a,e)},{directory:j.directory,version:j.zipVersion}):c()}var i=0;h()}var g=0;f(a,b,c,d,e)}function f(a,b,c,d){function e(a,b){a.isDirectory&&a.createReader().readEntries(b),a.isFile&&b([])}function f(a,b,c){e(b,function(b){function e(b){function c(a){f(a,b,function(){h++,g()})}b.isDirectory&&c(a.addDirectory(b.name)),b.isFile&&b.file(function(d){var e=a.addBlob(b.name,d);e.uncompressedSize=d.size,c(e)},d)}function g(){var a=b[h];a?e(a):c()}var h=0;g()})}b.isDirectory?f(a,b,c):b.file(function(d){a.addBlob(b.name,d),c()},d)}function g(a,b,c,d,e,f,g){function h(a,b,c,d,e,f){function j(b){function c(a){i+=b.uncompressedSize||0,h(a,b,function(){l++,k()},d,e,f)}b.directory?a.getDirectory(b.name,{create:!0},c,e):a.getFile(b.name,{create:!0},function(a){b.getData(new zip.FileWriter(a,zip.getMimeType(b.name)),c,function(a){d&&d(i+a,f)},g)},e)}function k(){var a=b.children[l];a?j(a):c()}var l=0;k()}var i=0;b.directory?h(a,b,c,d,e,f):b.getData(new zip.FileWriter(a,zip.getMimeType(b.name)),c,d,g)}function h(a){a.entries=[],a.root=new n(a)}function i(a,b,c,d,e){function f(){var h=g*p;d&&d(h,a.size),h<a.size?a.readUint8Array(h,Math.min(p,a.size-h),function(a){b.writeUint8Array(new Uint8Array(a),function(){g++,f()})},e):b.getData(c)}var g=0;f()}function j(a,b,c,d){var e=this;!a||a.constructor==e.Writer&&e.data?b(e.data):(e.reader||(e.reader=new e.Reader(e.data,d)),e.reader.init(function(){a.init(function(){i(e.reader,a,b,c,d)},d)}))}function k(a,b,c,d){if(a.directory)return d?new n(a.fs,b,c,a):new m(a.fs,b,c,a);throw"Parent entry is not a directory."}function l(){}function m(a,b,c,d){var e=this;l.prototype.init.call(e,a,b,c,d),e.Reader=c.Reader,e.Writer=c.Writer,e.data=c.data,e.getData=c.getData||j}function n(a,b,c,d){var e=this;l.prototype.init.call(e,a,b,c,d),e.directory=!0}function o(){h(this)}var p=524288,q=zip.TextWriter,r=zip.BlobWriter,s=zip.Data64URIWriter,t=zip.Reader,u=zip.TextReader,v=zip.BlobReader,w=zip.Data64URIReader,x=zip.createReader,y=zip.createWriter;a.prototype=new t,a.prototype.constructor=a,a.prototype.checkCrc32=!1,l.prototype={init:function(a,b,c,d){var e=this;if(a.root&&d&&d.getChildByName(b))throw"Entry filename already exists.";c||(c={}),e.fs=a,e.name=b,e.id=a.entries.length,e.parent=d,e.children=[],e.zipVersion=c.zipVersion||20,e.uncompressedSize=0,a.entries.push(e),d&&e.parent.children.push(e)},getFileEntry:function(a,d,e,f,h){var i=this;c(i,function(){g(a,i,d,e,f,b(i),h)},f)},moveTo:function(a){var b=this;if(!a.directory)throw"Target entry is not a directory.";if(a.isDescendantOf(b))throw"Entry is a ancestor of target entry.";if(b!=a){if(a.getChildByName(b.name))throw"Entry filename already exists.";d(b),b.parent=a,a.children.push(b)}},getFullname:function(){for(var a=this,b=a.name,c=a.parent;c;)b=(c.name?c.name+"/":"")+b,c=c.parent;return b},isDescendantOf:function(a){for(var b=this.parent;b&&b.id!=a.id;)b=b.parent;return!!b}},l.prototype.constructor=l;var z;m.prototype=z=new l,z.constructor=m,z.getText=function(a,b,c,d){this.getData(new q(d),a,b,c)},z.getBlob=function(a,b,c,d){this.getData(new r(a),b,c,d)},z.getData64URI=function(a,b,c,d){this.getData(new s(a),b,c,d)};var A;n.prototype=A=new l,A.constructor=n,A.addDirectory=function(a){return k(this,a,null,!0)},A.addText=function(a,b){return k(this,a,{data:b,Reader:u,Writer:q})},A.addBlob=function(a,b){return k(this,a,{data:b,Reader:v,Writer:r})},A.addData64URI=function(a,b){return k(this,a,{data:b,Reader:w,Writer:s})},A.addFileEntry=function(a,b,c){f(this,a,b,c)},A.addData=function(a,b){return k(this,a,b)},A.importBlob=function(a,b,c){this.importZip(new v(a),b,c)},A.importText=function(a,b,c){this.importZip(new u(a),b,c)},A.importData64URI=function(a,b,c){this.importZip(new w(a),b,c)},A.exportBlob=function(a,b,c){this.exportZip(new r("application/zip"),a,b,c)},A.exportText=function(a,b,c){this.exportZip(new q,a,b,c)},A.exportFileEntry=function(a,b,c,d){this.exportZip(new zip.FileWriter(a,"application/zip"),b,c,d)},A.exportData64URI=function(a,b,c){this.exportZip(new s("application/zip"),a,b,c)},A.importZip=function(b,c,d){var e=this;x(b,function(b){b.getEntries(function(b){b.forEach(function(b){var c=e,d=b.filename.split("/"),f=d.pop();d.forEach(function(a){c=c.getChildByName(a)||new n(e.fs,a,null,c)}),b.directory||k(c,f,{data:b,Reader:a})}),c()})},d)},A.exportZip=function(a,d,f,g){var h=this;c(h,function(){y(a,function(a){e(a,h,function(){a.close(d)},f,b(h))},g)},g)},A.getChildByName=function(a){var b,c,d=this;for(b=0;b<d.children.length;b++)if(c=d.children[b],c.name==a)return c},o.prototype={remove:function(a){d(a),this.entries[a.id]=null},find:function(a){var b,c=a.split("/"),d=this.root;for(b=0;d&&b<c.length;b++)d=d.getChildByName(c[b]);return d},getById:function(a){return this.entries[a]},importBlob:function(a,b,c){h(this),this.root.importBlob(a,b,c)},importText:function(a,b,c){h(this),this.root.importText(a,b,c)},importData64URI:function(a,b,c){h(this),this.root.importData64URI(a,b,c)},exportBlob:function(a,b,c){this.root.exportBlob(a,b,c)},exportText:function(a,b,c){this.root.exportText(a,b,c)},exportFileEntry:function(a,b,c,d){this.root.exportFileEntry(a,b,c,d)},exportData64URI:function(a,b,c){this.root.exportData64URI(a,b,c)}},zip.fs={FS:o,ZipDirectoryEntry:n,ZipFileEntry:m},zip.getMimeType=function(){return"application/octet-stream"}}(),function(){function a(a){function b(b,c){var d;e.data?b():(d=new XMLHttpRequest,d.addEventListener("load",function(){e.size||(e.size=Number(d.getResponseHeader("Content-Length"))),e.data=new Uint8Array(d.response),b()},!1),d.addEventListener("error",c,!1),d.open("GET",a),d.responseType="arraybuffer",d.send())}function c(b,c){var d=new XMLHttpRequest;d.addEventListener("load",function(){e.size=Number(d.getResponseHeader("Content-Length")),b()},!1),d.addEventListener("error",c,!1),d.open("HEAD",a),d.send()}function d(a,c,d,f){b(function(){d(new Uint8Array(e.data.subarray(a,a+c)))},f)}var e=this;e.size=0,e.init=c,e.readUint8Array=d}function b(a){function b(b,c){var d=new XMLHttpRequest;d.addEventListener("load",function(){e.size=Number(d.getResponseHeader("Content-Length")),"bytes"==d.getResponseHeader("Accept-Ranges")?b():c(h)},!1),d.addEventListener("error",c,!1),d.open("HEAD",a),d.send()}function c(b,c,d,e){var f=new XMLHttpRequest;f.open("GET",a),f.responseType="arraybuffer",f.setRequestHeader("Range","bytes="+b+"-"+(b+c-1)),f.addEventListener("load",function(){d(f.response)},!1),f.addEventListener("error",e,!1),f.send()}function d(a,b,d,e){c(a,b,function(a){d(new Uint8Array(a))},e)}var e=this;e.size=0,e.init=b,e.readUint8Array=d}function c(a){function b(b){d.size=a.byteLength,b()}function c(b,c,d){d(new Uint8Array(a.slice(b,b+c)))}var d=this;d.size=0,d.init=b,d.readUint8Array=c}function d(){function a(a){d=new Uint8Array,a()}function b(a,b){var c=new Uint8Array(d.length+a.length);c.set(d),c.set(a,d.length),d=c,b()}function c(a){a(d.buffer)}var d,e=this;e.init=a,e.writeUint8Array=b,e.getData=c}function e(a,b){function c(b,c){a.createWriter(function(a){f=a,b()},c)}function d(a,c,d){var e=new Blob([g?a:a.buffer],{type:b});f.onwrite=function(){f.onwrite=null,c()},f.onerror=d,f.write(e)}function e(b){a.file(b)}var f,h=this;h.init=c,h.writeUint8Array=d,h.getData=e}var f,g,h="HTTP Range not supported.",i=zip.Reader,j=zip.Writer;try{g=0===new Blob([new DataView(new ArrayBuffer(0))]).size}catch(k){}a.prototype=new i,a.prototype.constructor=a,b.prototype=new i,b.prototype.constructor=b,c.prototype=new i,c.prototype.constructor=c,d.prototype=new j,d.prototype.constructor=d,e.prototype=new j,e.prototype.constructor=e,zip.FileWriter=e,zip.HttpReader=a,zip.HttpRangeReader=b,zip.ArrayBufferReader=c,zip.ArrayBufferWriter=d,zip.fs&&(f=zip.fs.ZipDirectoryEntry,f.prototype.addHttpContent=function(c,d,e){function g(a,b,c,d){if(a.directory)return d?new f(a.fs,b,c,a):new zip.fs.ZipFileEntry(a.fs,b,c,a);throw"Parent entry is not a directory."}return g(this,c,{data:d,Reader:e?b:a})},f.prototype.importHttpContent=function(c,d,e,f){this.importZip(d?new b(c):new a(c),e,f)},zip.fs.FS.prototype.importHttpContent=function(a,b,c,d){this.entries=[],this.root=new f(this),this.root.importHttpContent(a,b,c,d)})}(),function(){var a={application:{"andrew-inset":"ez",annodex:"anx","atom+xml":"atom","atomcat+xml":"atomcat","atomserv+xml":"atomsrv",bbolin:"lin",cap:["cap","pcap"],"cu-seeme":"cu","davmount+xml":"davmount",dsptype:"tsp",ecmascript:["es","ecma"],futuresplash:"spl",hta:"hta","java-archive":"jar","java-serialized-object":"ser","java-vm":"class",javascript:"js",m3g:"m3g","mac-binhex40":"hqx",mathematica:["nb","ma","mb"],msaccess:"mdb",msword:["doc","dot"],mxf:"mxf",oda:"oda",ogg:"ogx",pdf:"pdf","pgp-keys":"key","pgp-signature":["asc","sig"],"pics-rules":"prf",postscript:["ps","ai","eps","epsi","epsf","eps2","eps3"],rar:"rar","rdf+xml":"rdf","rss+xml":"rss",rtf:"rtf",smil:["smi","smil"],"xhtml+xml":["xhtml","xht"],xml:["xml","xsl","xsd"],"xspf+xml":"xspf",zip:"zip","vnd.android.package-archive":"apk","vnd.cinderella":"cdy","vnd.google-earth.kml+xml":"kml","vnd.google-earth.kmz":"kmz","vnd.mozilla.xul+xml":"xul","vnd.ms-excel":["xls","xlb","xlt","xlm","xla","xlc","xlw"],"vnd.ms-pki.seccat":"cat","vnd.ms-pki.stl":"stl","vnd.ms-powerpoint":["ppt","pps","pot"],"vnd.oasis.opendocument.chart":"odc","vnd.oasis.opendocument.database":"odb","vnd.oasis.opendocument.formula":"odf","vnd.oasis.opendocument.graphics":"odg","vnd.oasis.opendocument.graphics-template":"otg","vnd.oasis.opendocument.image":"odi","vnd.oasis.opendocument.presentation":"odp","vnd.oasis.opendocument.presentation-template":"otp","vnd.oasis.opendocument.spreadsheet":"ods","vnd.oasis.opendocument.spreadsheet-template":"ots","vnd.oasis.opendocument.text":"odt","vnd.oasis.opendocument.text-master":"odm","vnd.oasis.opendocument.text-template":"ott","vnd.oasis.opendocument.text-web":"oth","vnd.openxmlformats-officedocument.spreadsheetml.sheet":"xlsx","vnd.openxmlformats-officedocument.spreadsheetml.template":"xltx","vnd.openxmlformats-officedocument.presentationml.presentation":"pptx","vnd.openxmlformats-officedocument.presentationml.slideshow":"ppsx","vnd.openxmlformats-officedocument.presentationml.template":"potx","vnd.openxmlformats-officedocument.wordprocessingml.document":"docx","vnd.openxmlformats-officedocument.wordprocessingml.template":"dotx","vnd.smaf":"mmf","vnd.stardivision.calc":"sdc","vnd.stardivision.chart":"sds","vnd.stardivision.draw":"sda","vnd.stardivision.impress":"sdd","vnd.stardivision.math":["sdf","smf"],"vnd.stardivision.writer":["sdw","vor"],"vnd.stardivision.writer-global":"sgl","vnd.sun.xml.calc":"sxc","vnd.sun.xml.calc.template":"stc","vnd.sun.xml.draw":"sxd","vnd.sun.xml.draw.template":"std","vnd.sun.xml.impress":"sxi","vnd.sun.xml.impress.template":"sti","vnd.sun.xml.math":"sxm","vnd.sun.xml.writer":"sxw","vnd.sun.xml.writer.global":"sxg","vnd.sun.xml.writer.template":"stw","vnd.symbian.install":["sis","sisx"],"vnd.visio":["vsd","vst","vss","vsw"],"vnd.wap.wbxml":"wbxml","vnd.wap.wmlc":"wmlc","vnd.wap.wmlscriptc":"wmlsc","vnd.wordperfect":"wpd","vnd.wordperfect5.1":"wp5","x-123":"wk","x-7z-compressed":"7z","x-abiword":"abw","x-apple-diskimage":"dmg","x-bcpio":"bcpio","x-bittorrent":"torrent","x-cbr":["cbr","cba","cbt","cb7"],"x-cbz":"cbz","x-cdf":["cdf","cda"],"x-cdlink":"vcd","x-chess-pgn":"pgn","x-cpio":"cpio","x-csh":"csh","x-debian-package":["deb","udeb"],"x-director":["dcr","dir","dxr","cst","cct","cxt","w3d","fgd","swa"],"x-dms":"dms","x-doom":"wad","x-dvi":"dvi","x-httpd-eruby":"rhtml","x-font":"pcf.Z","x-freemind":"mm","x-gnumeric":"gnumeric","x-go-sgf":"sgf","x-graphing-calculator":"gcf","x-gtar":["gtar","taz"],"x-hdf":"hdf","x-httpd-php":["phtml","pht","php"],"x-httpd-php-source":"phps","x-httpd-php3":"php3","x-httpd-php3-preprocessed":"php3p","x-httpd-php4":"php4","x-httpd-php5":"php5","x-ica":"ica","x-info":"info","x-internet-signup":["ins","isp"],"x-iphone":"iii","x-iso9660-image":"iso","x-java-jnlp-file":"jnlp","x-jmol":"jmz","x-killustrator":"kil","x-koan":["skp","skd","skt","skm"],"x-kpresenter":["kpr","kpt"],"x-kword":["kwd","kwt"],"x-latex":"latex","x-lha":"lha","x-lyx":"lyx","x-lzh":"lzh","x-lzx":"lzx","x-maker":["frm","maker","frame","fm","fb","book","fbdoc"],"x-ms-wmd":"wmd","x-ms-wmz":"wmz","x-msdos-program":["com","exe","bat","dll"],"x-msi":"msi","x-netcdf":["nc","cdf"],"x-ns-proxy-autoconfig":["pac","dat"],"x-nwc":"nwc","x-object":"o","x-oz-application":"oza","x-pkcs7-certreqresp":"p7r","x-python-code":["pyc","pyo"],"x-qgis":["qgs","shp","shx"],"x-quicktimeplayer":"qtl","x-redhat-package-manager":"rpm","x-ruby":"rb","x-sh":"sh","x-shar":"shar","x-shockwave-flash":["swf","swfl"],"x-silverlight":"scr","x-stuffit":"sit","x-sv4cpio":"sv4cpio","x-sv4crc":"sv4crc","x-tar":"tar","x-tcl":"tcl","x-tex-gf":"gf","x-tex-pk":"pk","x-texinfo":["texinfo","texi"],"x-trash":["~","%","bak","old","sik"],"x-troff":["t","tr","roff"],"x-troff-man":"man","x-troff-me":"me","x-troff-ms":"ms","x-ustar":"ustar","x-wais-source":"src","x-wingz":"wz","x-x509-ca-cert":["crt","der","cer"],"x-xcf":"xcf","x-xfig":"fig","x-xpinstall":"xpi",applixware:"aw","atomsvc+xml":"atomsvc","ccxml+xml":"ccxml","cdmi-capability":"cdmia","cdmi-container":"cdmic","cdmi-domain":"cdmid","cdmi-object":"cdmio","cdmi-queue":"cdmiq","docbook+xml":"dbk","dssc+der":"dssc","dssc+xml":"xdssc","emma+xml":"emma","epub+zip":"epub",exi:"exi","font-tdpfr":"pfr","gml+xml":"gml","gpx+xml":"gpx",gxf:"gxf",hyperstudio:"stk","inkml+xml":["ink","inkml"],ipfix:"ipfix",json:"json","jsonml+json":"jsonml","lost+xml":"lostxml","mads+xml":"mads",marc:"mrc","marcxml+xml":"mrcx","mathml+xml":"mathml",mbox:"mbox","mediaservercontrol+xml":"mscml","metalink+xml":"metalink","metalink4+xml":"meta4","mets+xml":"mets","mods+xml":"mods",mp21:["m21","mp21"],mp4:"mp4s","oebps-package+xml":"opf","omdoc+xml":"omdoc",onenote:["onetoc","onetoc2","onetmp","onepkg"],oxps:"oxps","patch-ops-error+xml":"xer","pgp-encrypted":"pgp",pkcs10:"p10","pkcs7-mime":["p7m","p7c"],"pkcs7-signature":"p7s",pkcs8:"p8","pkix-attr-cert":"ac","pkix-crl":"crl","pkix-pkipath":"pkipath",pkixcmp:"pki","pls+xml":"pls","prs.cww":"cww","pskc+xml":"pskcxml","reginfo+xml":"rif","relax-ng-compact-syntax":"rnc","resource-lists+xml":"rl","resource-lists-diff+xml":"rld","rls-services+xml":"rs","rpki-ghostbusters":"gbr","rpki-manifest":"mft","rpki-roa":"roa","rsd+xml":"rsd","sbml+xml":"sbml","scvp-cv-request":"scq","scvp-cv-response":"scs","scvp-vp-request":"spq","scvp-vp-response":"spp",sdp:"sdp","set-payment-initiation":"setpay","set-registration-initiation":"setreg","shf+xml":"shf","sparql-query":"rq","sparql-results+xml":"srx",srgs:"gram","srgs+xml":"grxml","sru+xml":"sru","ssdl+xml":"ssdl","ssml+xml":"ssml","tei+xml":["tei","teicorpus"],"thraud+xml":"tfi","timestamped-data":"tsd","vnd.3gpp.pic-bw-large":"plb","vnd.3gpp.pic-bw-small":"psb","vnd.3gpp.pic-bw-var":"pvb","vnd.3gpp2.tcap":"tcap","vnd.3m.post-it-notes":"pwn","vnd.accpac.simply.aso":"aso","vnd.accpac.simply.imp":"imp","vnd.acucobol":"acu","vnd.acucorp":["atc","acutc"],"vnd.adobe.air-application-installer-package+zip":"air","vnd.adobe.formscentral.fcdt":"fcdt","vnd.adobe.fxp":["fxp","fxpl"],"vnd.adobe.xdp+xml":"xdp","vnd.adobe.xfdf":"xfdf","vnd.ahead.space":"ahead","vnd.airzip.filesecure.azf":"azf","vnd.airzip.filesecure.azs":"azs","vnd.amazon.ebook":"azw","vnd.americandynamics.acc":"acc","vnd.amiga.ami":"ami","vnd.anser-web-certificate-issue-initiation":"cii","vnd.anser-web-funds-transfer-initiation":"fti","vnd.antix.game-component":"atx","vnd.apple.installer+xml":"mpkg","vnd.apple.mpegurl":"m3u8","vnd.aristanetworks.swi":"swi","vnd.astraea-software.iota":"iota","vnd.audiograph":"aep","vnd.blueice.multipass":"mpm","vnd.bmi":"bmi","vnd.businessobjects":"rep","vnd.chemdraw+xml":"cdxml","vnd.chipnuts.karaoke-mmd":"mmd","vnd.claymore":"cla","vnd.cloanto.rp9":"rp9","vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"vnd.cluetrust.cartomobile-config":"c11amc","vnd.cluetrust.cartomobile-config-pkg":"c11amz","vnd.commonspace":"csp","vnd.contact.cmsg":"cdbcmsg","vnd.cosmocaller":"cmc","vnd.crick.clicker":"clkx","vnd.crick.clicker.keyboard":"clkk","vnd.crick.clicker.palette":"clkp","vnd.crick.clicker.template":"clkt","vnd.crick.clicker.wordbank":"clkw","vnd.criticaltools.wbs+xml":"wbs","vnd.ctc-posml":"pml","vnd.cups-ppd":"ppd","vnd.curl.car":"car","vnd.curl.pcurl":"pcurl","vnd.dart":"dart","vnd.data-vision.rdz":"rdz","vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"vnd.dece.ttml+xml":["uvt","uvvt"],"vnd.dece.unspecified":["uvx","uvvx"],"vnd.dece.zip":["uvz","uvvz"],"vnd.denovo.fcselayout-link":"fe_launch","vnd.dna":"dna","vnd.dolby.mlp":"mlp","vnd.dpgraph":"dpg","vnd.dreamfactory":"dfac","vnd.ds-keypoint":"kpxx","vnd.dvb.ait":"ait","vnd.dvb.service":"svc","vnd.dynageo":"geo","vnd.ecowin.chart":"mag","vnd.enliven":"nml","vnd.epson.esf":"esf","vnd.epson.msf":"msf","vnd.epson.quickanime":"qam","vnd.epson.salt":"slt","vnd.epson.ssf":"ssf","vnd.eszigno3+xml":["es3","et3"],"vnd.ezpix-album":"ez2","vnd.ezpix-package":"ez3","vnd.fdf":"fdf","vnd.fdsn.mseed":"mseed","vnd.fdsn.seed":["seed","dataless"],"vnd.flographit":"gph","vnd.fluxtime.clip":"ftc","vnd.framemaker":["fm","frame","maker","book"],"vnd.frogans.fnc":"fnc","vnd.frogans.ltf":"ltf","vnd.fsc.weblaunch":"fsc","vnd.fujitsu.oasys":"oas","vnd.fujitsu.oasys2":"oa2","vnd.fujitsu.oasys3":"oa3","vnd.fujitsu.oasysgp":"fg5","vnd.fujitsu.oasysprs":"bh2","vnd.fujixerox.ddd":"ddd","vnd.fujixerox.docuworks":"xdw","vnd.fujixerox.docuworks.binder":"xbd","vnd.fuzzysheet":"fzs","vnd.genomatix.tuxedo":"txd","vnd.geogebra.file":"ggb","vnd.geogebra.tool":"ggt","vnd.geometry-explorer":["gex","gre"],"vnd.geonext":"gxt","vnd.geoplan":"g2w","vnd.geospace":"g3w","vnd.gmx":"gmx","vnd.grafeq":["gqf","gqs"],"vnd.groove-account":"gac","vnd.groove-help":"ghf","vnd.groove-identity-message":"gim","vnd.groove-injector":"grv","vnd.groove-tool-message":"gtm","vnd.groove-tool-template":"tpl","vnd.groove-vcard":"vcg","vnd.hal+xml":"hal","vnd.handheld-entertainment+xml":"zmm","vnd.hbci":"hbci","vnd.hhe.lesson-player":"les","vnd.hp-hpgl":"hpgl","vnd.hp-hpid":"hpid","vnd.hp-hps":"hps","vnd.hp-jlyt":"jlt","vnd.hp-pcl":"pcl","vnd.hp-pclxl":"pclxl","vnd.hydrostatix.sof-data":"sfd-hdstx","vnd.ibm.minipay":"mpy","vnd.ibm.modcap":["afp","listafp","list3820"],"vnd.ibm.rights-management":"irm","vnd.ibm.secure-container":"sc","vnd.iccprofile":["icc","icm"],"vnd.igloader":"igl","vnd.immervision-ivp":"ivp","vnd.immervision-ivu":"ivu","vnd.insors.igm":"igm","vnd.intercon.formnet":["xpw","xpx"],"vnd.intergeo":"i2g","vnd.intu.qbo":"qbo","vnd.intu.qfx":"qfx","vnd.ipunplugged.rcprofile":"rcprofile","vnd.irepository.package+xml":"irp","vnd.is-xpr":"xpr","vnd.isac.fcs":"fcs","vnd.jam":"jam","vnd.jcp.javame.midlet-rms":"rms","vnd.jisp":"jisp","vnd.joost.joda-archive":"joda","vnd.kahootz":["ktz","ktr"],"vnd.kde.karbon":"karbon","vnd.kde.kchart":"chrt","vnd.kde.kformula":"kfo","vnd.kde.kivio":"flw","vnd.kde.kontour":"kon","vnd.kde.kpresenter":["kpr","kpt"],"vnd.kde.kspread":"ksp","vnd.kde.kword":["kwd","kwt"],"vnd.kenameaapp":"htke","vnd.kidspiration":"kia","vnd.kinar":["kne","knp"],"vnd.koan":["skp","skd","skt","skm"],"vnd.kodak-descriptor":"sse","vnd.las.las+xml":"lasxml","vnd.llamagraphics.life-balance.desktop":"lbd","vnd.llamagraphics.life-balance.exchange+xml":"lbe","vnd.lotus-1-2-3":"123","vnd.lotus-approach":"apr","vnd.lotus-freelance":"pre","vnd.lotus-notes":"nsf","vnd.lotus-organizer":"org","vnd.lotus-screencam":"scm","vnd.lotus-wordpro":"lwp","vnd.macports.portpkg":"portpkg","vnd.mcd":"mcd","vnd.medcalcdata":"mc1","vnd.mediastation.cdkey":"cdkey","vnd.mfer":"mwf","vnd.mfmp":"mfm","vnd.micrografx.flo":"flo","vnd.micrografx.igx":"igx","vnd.mif":"mif","vnd.mobius.daf":"daf","vnd.mobius.dis":"dis","vnd.mobius.mbk":"mbk","vnd.mobius.mqy":"mqy","vnd.mobius.msl":"msl","vnd.mobius.plc":"plc","vnd.mobius.txf":"txf","vnd.mophun.application":"mpn","vnd.mophun.certificate":"mpc","vnd.ms-artgalry":"cil","vnd.ms-cab-compressed":"cab","vnd.ms-excel.addin.macroenabled.12":"xlam","vnd.ms-excel.sheet.binary.macroenabled.12":"xlsb","vnd.ms-excel.sheet.macroenabled.12":"xlsm","vnd.ms-excel.template.macroenabled.12":"xltm","vnd.ms-fontobject":"eot","vnd.ms-htmlhelp":"chm","vnd.ms-ims":"ims","vnd.ms-lrm":"lrm","vnd.ms-officetheme":"thmx","vnd.ms-powerpoint.addin.macroenabled.12":"ppam","vnd.ms-powerpoint.presentation.macroenabled.12":"pptm","vnd.ms-powerpoint.slide.macroenabled.12":"sldm","vnd.ms-powerpoint.slideshow.macroenabled.12":"ppsm","vnd.ms-powerpoint.template.macroenabled.12":"potm","vnd.ms-project":["mpp","mpt"],"vnd.ms-word.document.macroenabled.12":"docm","vnd.ms-word.template.macroenabled.12":"dotm","vnd.ms-works":["wps","wks","wcm","wdb"],"vnd.ms-wpl":"wpl","vnd.ms-xpsdocument":"xps","vnd.mseq":"mseq","vnd.musician":"mus","vnd.muvee.style":"msty","vnd.mynfc":"taglet","vnd.neurolanguage.nlu":"nlu","vnd.nitf":["ntf","nitf"],"vnd.noblenet-directory":"nnd","vnd.noblenet-sealer":"nns","vnd.noblenet-web":"nnw","vnd.nokia.n-gage.data":"ngdat","vnd.nokia.n-gage.symbian.install":"n-gage","vnd.nokia.radio-preset":"rpst","vnd.nokia.radio-presets":"rpss","vnd.novadigm.edm":"edm","vnd.novadigm.edx":"edx","vnd.novadigm.ext":"ext","vnd.oasis.opendocument.chart-template":"otc","vnd.oasis.opendocument.formula-template":"odft","vnd.oasis.opendocument.image-template":"oti","vnd.olpc-sugar":"xo","vnd.oma.dd2+xml":"dd2","vnd.openofficeorg.extension":"oxt","vnd.openxmlformats-officedocument.presentationml.slide":"sldx","vnd.osgeo.mapguide.package":"mgp","vnd.osgi.dp":"dp","vnd.osgi.subsystem":"esa","vnd.palm":["pdb","pqa","oprc"],"vnd.pawaafile":"paw","vnd.pg.format":"str","vnd.pg.osasli":"ei6","vnd.picsel":"efif","vnd.pmi.widget":"wg","vnd.pocketlearn":"plf","vnd.powerbuilder6":"pbd","vnd.previewsystems.box":"box","vnd.proteus.magazine":"mgz","vnd.publishare-delta-tree":"qps","vnd.pvi.ptid1":"ptid","vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"vnd.realvnc.bed":"bed","vnd.recordare.musicxml":"mxl","vnd.recordare.musicxml+xml":"musicxml","vnd.rig.cryptonote":"cryptonote","vnd.rn-realmedia":"rm","vnd.rn-realmedia-vbr":"rmvb","vnd.route66.link66+xml":"link66","vnd.sailingtracker.track":"st","vnd.seemail":"see","vnd.sema":"sema","vnd.semd":"semd","vnd.semf":"semf","vnd.shana.informed.formdata":"ifm","vnd.shana.informed.formtemplate":"itp","vnd.shana.informed.interchange":"iif","vnd.shana.informed.package":"ipk","vnd.simtech-mindmapper":["twd","twds"],"vnd.smart.teacher":"teacher","vnd.solent.sdkm+xml":["sdkm","sdkd"],"vnd.spotfire.dxp":"dxp","vnd.spotfire.sfs":"sfs","vnd.stepmania.package":"smzip","vnd.stepmania.stepchart":"sm","vnd.sus-calendar":["sus","susp"],"vnd.svd":"svd","vnd.syncml+xml":"xsm","vnd.syncml.dm+wbxml":"bdm","vnd.syncml.dm+xml":"xdm","vnd.tao.intent-module-archive":"tao","vnd.tcpdump.pcap":["pcap","cap","dmp"],"vnd.tmobile-livetv":"tmo","vnd.trid.tpt":"tpt","vnd.triscape.mxs":"mxs","vnd.trueapp":"tra","vnd.ufdl":["ufd","ufdl"],"vnd.uiq.theme":"utz","vnd.umajin":"umj","vnd.unity":"unityweb","vnd.uoml+xml":"uoml","vnd.vcx":"vcx","vnd.visionary":"vis","vnd.vsf":"vsf","vnd.webturbo":"wtb","vnd.wolfram.player":"nbp","vnd.wqd":"wqd","vnd.wt.stf":"stf","vnd.xara":"xar","vnd.xfdl":"xfdl","vnd.yamaha.hv-dic":"hvd","vnd.yamaha.hv-script":"hvs","vnd.yamaha.hv-voice":"hvp","vnd.yamaha.openscoreformat":"osf","vnd.yamaha.openscoreformat.osfpvg+xml":"osfpvg","vnd.yamaha.smaf-audio":"saf","vnd.yamaha.smaf-phrase":"spf","vnd.yellowriver-custom-menu":"cmp","vnd.zul":["zir","zirz"],"vnd.zzazz.deck+xml":"zaz","voicexml+xml":"vxml",widget:"wgt",winhlp:"hlp","wsdl+xml":"wsdl","wspolicy+xml":"wspolicy","x-ace-compressed":"ace","x-authorware-bin":["aab","x32","u32","vox"],"x-authorware-map":"aam","x-authorware-seg":"aas","x-blorb":["blb","blorb"],"x-bzip":"bz","x-bzip2":["bz2","boz"],"x-cfs-compressed":"cfs","x-chat":"chat","x-conference":"nsc","x-dgc-compressed":"dgc","x-dtbncx+xml":"ncx","x-dtbook+xml":"dtb","x-dtbresource+xml":"res","x-eva":"eva","x-font-bdf":"bdf","x-font-ghostscript":"gsf","x-font-linux-psf":"psf","x-font-otf":"otf","x-font-pcf":"pcf","x-font-snf":"snf","x-font-ttf":["ttf","ttc"],"x-font-type1":["pfa","pfb","pfm","afm"],"x-font-woff":"woff","x-freearc":"arc","x-gca-compressed":"gca","x-glulx":"ulx","x-gramps-xml":"gramps","x-install-instructions":"install","x-lzh-compressed":["lzh","lha"],"x-mie":"mie","x-mobipocket-ebook":["prc","mobi"],"x-ms-application":"application","x-ms-shortcut":"lnk","x-ms-xbap":"xbap","x-msbinder":"obd","x-mscardfile":"crd","x-msclip":"clp","x-msdownload":["exe","dll","com","bat","msi"],"x-msmediaview":["mvb","m13","m14"],"x-msmetafile":["wmf","wmz","emf","emz"],"x-msmoney":"mny","x-mspublisher":"pub","x-msschedule":"scd","x-msterminal":"trm","x-mswrite":"wri","x-nzb":"nzb","x-pkcs12":["p12","pfx"],"x-pkcs7-certificates":["p7b","spc"],"x-research-info-systems":"ris","x-silverlight-app":"xap","x-sql":"sql","x-stuffitx":"sitx","x-subrip":"srt","x-t3vm-image":"t3","x-tads":"gam","x-tex":"tex","x-tex-tfm":"tfm","x-tgif":"obj","x-xliff+xml":"xlf","x-xz":"xz","x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"xaml+xml":"xaml","xcap-diff+xml":"xdf","xenc+xml":"xenc","xml-dtd":"dtd","xop+xml":"xop","xproc+xml":"xpl","xslt+xml":"xslt","xv+xml":["mxml","xhvml","xvml","xvm"],yang:"yang","yin+xml":"yin",envoy:"evy",fractals:"fif","internet-property-stream":"acx",olescript:"axs","vnd.ms-outlook":"msg","vnd.ms-pkicertstore":"sst","x-compress":"z","x-compressed":"tgz","x-gzip":"gz","x-perfmon":["pma","pmc","pml","pmr","pmw"],"x-pkcs7-mime":["p7c","p7m"],"ynd.ms-pkipko":"pko"},audio:{amr:"amr","amr-wb":"awb",annodex:"axa",basic:["au","snd"],flac:"flac",midi:["mid","midi","kar","rmi"],mpeg:["mpga","mpega","mp2","mp3","m4a","mp2a","m2a","m3a"],mpegurl:"m3u",ogg:["oga","ogg","spx"],"prs.sid":"sid","x-aiff":["aif","aiff","aifc"],"x-gsm":"gsm","x-ms-wma":"wma","x-ms-wax":"wax","x-pn-realaudio":"ram","x-realaudio":"ra","x-sd2":"sd2","x-wav":"wav",adpcm:"adp",mp4:"mp4a",s3m:"s3m",silk:"sil","vnd.dece.audio":["uva","uvva"],"vnd.digital-winds":"eol","vnd.dra":"dra","vnd.dts":"dts","vnd.dts.hd":"dtshd","vnd.lucent.voice":"lvp","vnd.ms-playready.media.pya":"pya","vnd.nuera.ecelp4800":"ecelp4800","vnd.nuera.ecelp7470":"ecelp7470","vnd.nuera.ecelp9600":"ecelp9600","vnd.rip":"rip",webm:"weba","x-aac":"aac","x-caf":"caf","x-matroska":"mka","x-pn-realaudio-plugin":"rmp",xm:"xm",mid:["mid","rmi"]},chemical:{"x-alchemy":"alc","x-cache":["cac","cache"],"x-cache-csf":"csf","x-cactvs-binary":["cbin","cascii","ctab"],"x-cdx":"cdx","x-chem3d":"c3d","x-cif":"cif","x-cmdf":"cmdf","x-cml":"cml","x-compass":"cpa","x-crossfire":"bsd","x-csml":["csml","csm"],"x-ctx":"ctx","x-cxf":["cxf","cef"],"x-embl-dl-nucleotide":["emb","embl"],"x-gamess-input":["inp","gam","gamin"],"x-gaussian-checkpoint":["fch","fchk"],"x-gaussian-cube":"cub","x-gaussian-input":["gau","gjc","gjf"],"x-gaussian-log":"gal","x-gcg8-sequence":"gcg","x-genbank":"gen","x-hin":"hin","x-isostar":["istr","ist"],"x-jcamp-dx":["jdx","dx"],"x-kinemage":"kin","x-macmolecule":"mcm","x-macromodel-input":["mmd","mmod"],"x-mdl-molfile":"mol","x-mdl-rdfile":"rd","x-mdl-rxnfile":"rxn","x-mdl-sdfile":["sd","sdf"],"x-mdl-tgf":"tgf","x-mmcif":"mcif","x-mol2":"mol2","x-molconn-Z":"b","x-mopac-graph":"gpt","x-mopac-input":["mop","mopcrt","mpc","zmt"],"x-mopac-out":"moo","x-ncbi-asn1":"asn","x-ncbi-asn1-ascii":["prt","ent"],"x-ncbi-asn1-binary":["val","aso"],"x-pdb":["pdb","ent"],"x-rosdal":"ros","x-swissprot":"sw","x-vamas-iso14976":"vms","x-vmd":"vmd","x-xtel":"xtel","x-xyz":"xyz"},image:{gif:"gif",ief:"ief",jpeg:["jpeg","jpg","jpe"],pcx:"pcx",png:"png","svg+xml":["svg","svgz"],tiff:["tiff","tif"],"vnd.djvu":["djvu","djv"],"vnd.wap.wbmp":"wbmp","x-canon-cr2":"cr2","x-canon-crw":"crw","x-cmu-raster":"ras","x-coreldraw":"cdr","x-coreldrawpattern":"pat","x-coreldrawtemplate":"cdt","x-corelphotopaint":"cpt","x-epson-erf":"erf","x-icon":"ico","x-jg":"art","x-jng":"jng","x-nikon-nef":"nef","x-olympus-orf":"orf","x-photoshop":"psd","x-portable-anymap":"pnm","x-portable-bitmap":"pbm","x-portable-graymap":"pgm","x-portable-pixmap":"ppm","x-rgb":"rgb","x-xbitmap":"xbm","x-xpixmap":"xpm","x-xwindowdump":"xwd",bmp:"bmp",cgm:"cgm",g3fax:"g3",ktx:"ktx","prs.btif":"btif",sgi:"sgi","vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"vnd.dwg":"dwg","vnd.dxf":"dxf","vnd.fastbidsheet":"fbs","vnd.fpx":"fpx","vnd.fst":"fst","vnd.fujixerox.edmics-mmr":"mmr","vnd.fujixerox.edmics-rlc":"rlc","vnd.ms-modi":"mdi","vnd.ms-photo":"wdp","vnd.net-fpx":"npx","vnd.xiff":"xif",webp:"webp","x-3ds":"3ds","x-cmx":"cmx","x-freehand":["fh","fhc","fh4","fh5","fh7"],"x-pict":["pic","pct"],"x-tga":"tga","cis-cod":"cod",pipeg:"jfif"},message:{rfc822:["eml","mime","mht","mhtml","nws"]},model:{iges:["igs","iges"],mesh:["msh","mesh","silo"],vrml:["wrl","vrml"],"x3d+vrml":["x3dv","x3dvz"],"x3d+xml":["x3d","x3dz"],"x3d+binary":["x3db","x3dbz"],"vnd.collada+xml":"dae","vnd.dwf":"dwf","vnd.gdl":"gdl","vnd.gtw":"gtw","vnd.mts":"mts","vnd.vtu":"vtu"},text:{"cache-manifest":["manifest","appcache"],calendar:["ics","icz","ifb"],css:"css",csv:"csv",h323:"323",html:["html","htm","shtml","stm"],iuls:"uls",mathml:"mml",plain:["txt","text","brf","conf","def","list","log","in","bas"],richtext:"rtx",scriptlet:["sct","wsc"],texmacs:["tm","ts"],"tab-separated-values":"tsv","vnd.sun.j2me.app-descriptor":"jad","vnd.wap.wml":"wml","vnd.wap.wmlscript":"wmls","x-bibtex":"bib","x-boo":"boo","x-c++hdr":["h++","hpp","hxx","hh"],"x-c++src":["c++","cpp","cxx","cc"],"x-component":"htc","x-dsrc":"d","x-diff":["diff","patch"],"x-haskell":"hs","x-java":"java","x-literate-haskell":"lhs","x-moc":"moc","x-pascal":["p","pas"],"x-pcs-gcd":"gcd","x-perl":["pl","pm"],"x-python":"py","x-scala":"scala","x-setext":"etx","x-tcl":["tcl","tk"],"x-tex":["tex","ltx","sty","cls"],"x-vcalendar":"vcs","x-vcard":"vcf",n3:"n3","prs.lines.tag":"dsc",sgml:["sgml","sgm"],troff:["t","tr","roff","man","me","ms"],turtle:"ttl","uri-list":["uri","uris","urls"],vcard:"vcard","vnd.curl":"curl","vnd.curl.dcurl":"dcurl","vnd.curl.scurl":"scurl","vnd.curl.mcurl":"mcurl","vnd.dvb.subtitle":"sub","vnd.fly":"fly","vnd.fmi.flexstor":"flx","vnd.graphviz":"gv","vnd.in3d.3dml":"3dml","vnd.in3d.spot":"spot","x-asm":["s","asm"],"x-c":["c","cc","cxx","cpp","h","hh","dic"],"x-fortran":["f","for","f77","f90"],"x-opml":"opml","x-nfo":"nfo","x-sfv":"sfv","x-uuencode":"uu",webviewhtml:"htt"},video:{"3gpp":"3gp",annodex:"axv",dl:"dl",dv:["dif","dv"],fli:"fli",gl:"gl",mpeg:["mpeg","mpg","mpe","m1v","m2v","mp2","mpa","mpv2"],mp4:["mp4","mp4v","mpg4"],quicktime:["qt","mov"],ogg:"ogv","vnd.mpegurl":["mxu","m4u"],"x-flv":"flv","x-la-asf":["lsf","lsx"],"x-mng":"mng","x-ms-asf":["asf","asx","asr"],"x-ms-wm":"wm","x-ms-wmv":"wmv","x-ms-wmx":"wmx","x-ms-wvx":"wvx","x-msvideo":"avi","x-sgi-movie":"movie","x-matroska":["mpv","mkv","mk3d","mks"],"3gpp2":"3g2",h261:"h261",h263:"h263",h264:"h264",jpeg:"jpgv",jpm:["jpm","jpgm"],mj2:["mj2","mjp2"],"vnd.dece.hd":["uvh","uvvh"],"vnd.dece.mobile":["uvm","uvvm"],"vnd.dece.pd":["uvp","uvvp"],"vnd.dece.sd":["uvs","uvvs"],"vnd.dece.video":["uvv","uvvv"],"vnd.dvb.file":"dvb","vnd.fvt":"fvt","vnd.ms-playready.media.pyv":"pyv","vnd.uvvu.mp4":["uvu","uvvu"],"vnd.vivo":"viv",webm:"webm","x-f4v":"f4v","x-m4v":"m4v","x-ms-vob":"vob","x-smv":"smv"},"x-conference":{"x-cooltalk":"ice"},"x-world":{"x-vrml":["vrm","vrml","wrl","flr","wrz","xaf","xof"]}},b=function(){var b,c,d,e,f={};
for(b in a)if(a.hasOwnProperty(b))for(c in a[b])if(a[b].hasOwnProperty(c))if(d=a[b][c],"string"==typeof d)f[d]=b+"/"+c;else for(e=0;e<d.length;e++)f[d[e]]=b+"/"+c;return f}();zip.getMimeType=function(a){var c="application/octet-stream";return a&&b[a.split(".").pop().toLowerCase()]||c}}();
//# sourceMappingURL=zip.min.map
;
/*! fileStorage - v0.1.0 - 2013-06-04 */
var fileStorage = fileStorage || {};
// var _requestFileSystem=self.requestFileSystem||self.webkitRequestFileSystem;const DBSIZE=5242880,DBTYPE=TEMPORARY;self.onmessage=function(e){var t=e.data;self.request(t,function(e){self.save(t,e,function(){self.postMessage(t)})})},self.openFs=function(e){if(self._fs){e&&e(self._fs);return}_requestFileSystem(DBTYPE,DBSIZE,function(t){self._fs=t,e&&e(t)},self.failure)},self.request=function(e,t){var n=new self.loadFile(e);n.succeeded=function(e){t&&t(e)},n.failed=function(e){self.postMessage("failed: "+e.toString())},n.start()},self.save=function(e,t,n){self.openFs(function(r){var i=e.split("/").slice(0,-1);self.createDir(r.root,i),r.root.getFile(e,{create:!0},function(r){r.createWriter(function(r){r.onwriteend=function(e){n(e)},r.onerror=function(t){self.postMessage("write error:"+self.errorHandler(err)+" path="+e)},r.write(t)})},self.failure)})},self.createDir=function(e,t){if(t[0]=="."||t[0]=="")t=t.slice(1);e.getDirectory(t[0],{create:!0},function(e){t.length&&createDir(e,t.slice(1))},self.failure)},self.failure=function(e){self.postMessage("failed: "+self.errorHandler(e))},self.errorHandler=function(e){switch(e.code){case FileError.QUOTA_EXCEEDED_ERR:return"QUOTA_EXCEEDED_ERR";case FileError.NOT_FOUND_ERR:return"NOT_FOUND_ERR";case FileError.SECURITY_ERR:return"SECURITY_ERR";case FileError.INVALID_MODIFICATION_ERR:return"INVALID_MODIFICATION_ERR";case FileError.INVALID_STATE_ERR:return"INVALID_STATE_ERR";default:return"Unknown Error"}},self.loadFile=function(e,t){var n=new XMLHttpRequest;return this.succeeded=function(e){t&&t(e)},this.failed=function(e){console.log("Error:",e)},this.start=function(){var t=this;n.open("GET",e,!0),n.responseType="blob",n.onload=function(e){this.status==200&&t.succeeded(this.response)},n.onerror=function(e){t.failed(this.status)},n.send()},{start:this.start,succeeded:this.succeeded,failed:this.failed}},self.openFs();
//# sourceMappingURL=loader_filesystem.min.js.map
;
/*!
* Masonry PACKAGED v3.1.5
* Cascading grid layout library
* http://masonry.desandro.com
* MIT License
* by David DeSandro
*/


!function(a){function b(){}function c(a){function c(b){b.prototype.option||(b.prototype.option=function(b){a.isPlainObject(b)&&(this.options=a.extend(!0,this.options,b))})}function e(b,c){a.fn[b]=function(e){if("string"==typeof e){for(var g=d.call(arguments,1),h=0,i=this.length;i>h;h++){var j=this[h],k=a.data(j,b);if(k)if(a.isFunction(k[e])&&"_"!==e.charAt(0)){var l=k[e].apply(k,g);if(void 0!==l)return l}else f("no such method '"+e+"' for "+b+" instance");else f("cannot call methods on "+b+" prior to initialization; attempted to call '"+e+"'")}return this}return this.each(function(){var d=a.data(this,b);d?(d.option(e),d._init()):(d=new c(this,e),a.data(this,b,d))})}}if(a){var f="undefined"==typeof console?b:function(a){console.error(a)};return a.bridget=function(a,b){c(b),e(a,b)},a.bridget}}var d=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],c):c(a.jQuery)}(window),function(a){function b(b){var c=a.event;return c.target=c.target||c.srcElement||b,c}var c=document.documentElement,d=function(){};c.addEventListener?d=function(a,b,c){a.addEventListener(b,c,!1)}:c.attachEvent&&(d=function(a,c,d){a[c+d]=d.handleEvent?function(){var c=b(a);d.handleEvent.call(d,c)}:function(){var c=b(a);d.call(a,c)},a.attachEvent("on"+c,a[c+d])});var e=function(){};c.removeEventListener?e=function(a,b,c){a.removeEventListener(b,c,!1)}:c.detachEvent&&(e=function(a,b,c){a.detachEvent("on"+b,a[b+c]);try{delete a[b+c]}catch(d){a[b+c]=void 0}});var f={bind:d,unbind:e};"function"==typeof define&&define.amd?define("eventie/eventie",f):"object"==typeof exports?module.exports=f:a.eventie=f}(this),function(a){function b(a){"function"==typeof a&&(b.isReady?a():f.push(a))}function c(a){var c="readystatechange"===a.type&&"complete"!==e.readyState;if(!b.isReady&&!c){b.isReady=!0;for(var d=0,g=f.length;g>d;d++){var h=f[d];h()}}}function d(d){return d.bind(e,"DOMContentLoaded",c),d.bind(e,"readystatechange",c),d.bind(a,"load",c),b}var e=a.document,f=[];b.isReady=!1,"function"==typeof define&&define.amd?(b.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],d)):a.docReady=d(a.eventie)}(this),function(){function a(){}function b(a,b){for(var c=a.length;c--;)if(a[c].listener===b)return c;return-1}function c(a){return function(){return this[a].apply(this,arguments)}}var d=a.prototype,e=this,f=e.EventEmitter;d.getListeners=function(a){var b,c,d=this._getEvents();if(a instanceof RegExp){b={};for(c in d)d.hasOwnProperty(c)&&a.test(c)&&(b[c]=d[c])}else b=d[a]||(d[a]=[]);return b},d.flattenListeners=function(a){var b,c=[];for(b=0;b<a.length;b+=1)c.push(a[b].listener);return c},d.getListenersAsObject=function(a){var b,c=this.getListeners(a);return c instanceof Array&&(b={},b[a]=c),b||c},d.addListener=function(a,c){var d,e=this.getListenersAsObject(a),f="object"==typeof c;for(d in e)e.hasOwnProperty(d)&&-1===b(e[d],c)&&e[d].push(f?c:{listener:c,once:!1});return this},d.on=c("addListener"),d.addOnceListener=function(a,b){return this.addListener(a,{listener:b,once:!0})},d.once=c("addOnceListener"),d.defineEvent=function(a){return this.getListeners(a),this},d.defineEvents=function(a){for(var b=0;b<a.length;b+=1)this.defineEvent(a[b]);return this},d.removeListener=function(a,c){var d,e,f=this.getListenersAsObject(a);for(e in f)f.hasOwnProperty(e)&&(d=b(f[e],c),-1!==d&&f[e].splice(d,1));return this},d.off=c("removeListener"),d.addListeners=function(a,b){return this.manipulateListeners(!1,a,b)},d.removeListeners=function(a,b){return this.manipulateListeners(!0,a,b)},d.manipulateListeners=function(a,b,c){var d,e,f=a?this.removeListener:this.addListener,g=a?this.removeListeners:this.addListeners;if("object"!=typeof b||b instanceof RegExp)for(d=c.length;d--;)f.call(this,b,c[d]);else for(d in b)b.hasOwnProperty(d)&&(e=b[d])&&("function"==typeof e?f.call(this,d,e):g.call(this,d,e));return this},d.removeEvent=function(a){var b,c=typeof a,d=this._getEvents();if("string"===c)delete d[a];else if(a instanceof RegExp)for(b in d)d.hasOwnProperty(b)&&a.test(b)&&delete d[b];else delete this._events;return this},d.removeAllListeners=c("removeEvent"),d.emitEvent=function(a,b){var c,d,e,f,g=this.getListenersAsObject(a);for(e in g)if(g.hasOwnProperty(e))for(d=g[e].length;d--;)c=g[e][d],c.once===!0&&this.removeListener(a,c.listener),f=c.listener.apply(this,b||[]),f===this._getOnceReturnValue()&&this.removeListener(a,c.listener);return this},d.trigger=c("emitEvent"),d.emit=function(a){var b=Array.prototype.slice.call(arguments,1);return this.emitEvent(a,b)},d.setOnceReturnValue=function(a){return this._onceReturnValue=a,this},d._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},d._getEvents=function(){return this._events||(this._events={})},a.noConflict=function(){return e.EventEmitter=f,a},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return a}):"object"==typeof module&&module.exports?module.exports=a:this.EventEmitter=a}.call(this),function(a){function b(a){if(a){if("string"==typeof d[a])return a;a=a.charAt(0).toUpperCase()+a.slice(1);for(var b,e=0,f=c.length;f>e;e++)if(b=c[e]+a,"string"==typeof d[b])return b}}var c="Webkit Moz ms Ms O".split(" "),d=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return b}):"object"==typeof exports?module.exports=b:a.getStyleProperty=b}(window),function(a){function b(a){var b=parseFloat(a),c=-1===a.indexOf("%")&&!isNaN(b);return c&&b}function c(){for(var a={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},b=0,c=g.length;c>b;b++){var d=g[b];a[d]=0}return a}function d(a){function d(a){if("string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var d=f(a);if("none"===d.display)return c();var e={};e.width=a.offsetWidth,e.height=a.offsetHeight;for(var k=e.isBorderBox=!(!j||!d[j]||"border-box"!==d[j]),l=0,m=g.length;m>l;l++){var n=g[l],o=d[n];o=h(a,o);var p=parseFloat(o);e[n]=isNaN(p)?0:p}var q=e.paddingLeft+e.paddingRight,r=e.paddingTop+e.paddingBottom,s=e.marginLeft+e.marginRight,t=e.marginTop+e.marginBottom,u=e.borderLeftWidth+e.borderRightWidth,v=e.borderTopWidth+e.borderBottomWidth,w=k&&i,x=b(d.width);x!==!1&&(e.width=x+(w?0:q+u));var y=b(d.height);return y!==!1&&(e.height=y+(w?0:r+v)),e.innerWidth=e.width-(q+u),e.innerHeight=e.height-(r+v),e.outerWidth=e.width+s,e.outerHeight=e.height+t,e}}function h(a,b){if(e||-1===b.indexOf("%"))return b;var c=a.style,d=c.left,f=a.runtimeStyle,g=f&&f.left;return g&&(f.left=a.currentStyle.left),c.left=b,b=c.pixelLeft,c.left=d,g&&(f.left=g),b}var i,j=a("boxSizing");return function(){if(j){var a=document.createElement("div");a.style.width="200px",a.style.padding="1px 2px 3px 4px",a.style.borderStyle="solid",a.style.borderWidth="1px 2px 3px 4px",a.style[j]="border-box";var c=document.body||document.documentElement;c.appendChild(a);var d=f(a);i=200===b(d.width),c.removeChild(a)}}(),d}var e=a.getComputedStyle,f=e?function(a){return e(a,null)}:function(a){return a.currentStyle},g=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],d):"object"==typeof exports?module.exports=d(require("get-style-property")):a.getSize=d(a.getStyleProperty)}(window),function(a,b){function c(a,b){return a[h](b)}function d(a){if(!a.parentNode){var b=document.createDocumentFragment();b.appendChild(a)}}function e(a,b){d(a);for(var c=a.parentNode.querySelectorAll(b),e=0,f=c.length;f>e;e++)if(c[e]===a)return!0;return!1}function f(a,b){return d(a),c(a,b)}var g,h=function(){if(b.matchesSelector)return"matchesSelector";for(var a=["webkit","moz","ms","o"],c=0,d=a.length;d>c;c++){var e=a[c],f=e+"MatchesSelector";if(b[f])return f}}();if(h){var i=document.createElement("div"),j=c(i,"div");g=j?c:f}else g=e;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return g}):window.matchesSelector=g}(this,Element.prototype),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){for(var b in a)return!1;return b=null,!0}function d(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function e(a,e,f){function h(a,b){a&&(this.element=a,this.layout=b,this.position={x:0,y:0},this._create())}var i=f("transition"),j=f("transform"),k=i&&j,l=!!f("perspective"),m={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[i],n=["transform","transition","transitionDuration","transitionProperty"],o=function(){for(var a={},b=0,c=n.length;c>b;b++){var d=n[b],e=f(d);e&&e!==d&&(a[d]=e)}return a}();b(h.prototype,a.prototype),h.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},h.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},h.prototype.getSize=function(){this.size=e(this.element)},h.prototype.css=function(a){var b=this.element.style;for(var c in a){var d=o[c]||c;b[d]=a[c]}},h.prototype.getPosition=function(){var a=g(this.element),b=this.layout.options,c=b.isOriginLeft,d=b.isOriginTop,e=parseInt(a[c?"left":"right"],10),f=parseInt(a[d?"top":"bottom"],10);e=isNaN(e)?0:e,f=isNaN(f)?0:f;var h=this.layout.size;e-=c?h.paddingLeft:h.paddingRight,f-=d?h.paddingTop:h.paddingBottom,this.position.x=e,this.position.y=f},h.prototype.layoutPosition=function(){var a=this.layout.size,b=this.layout.options,c={};b.isOriginLeft?(c.left=this.position.x+a.paddingLeft+"px",c.right=""):(c.right=this.position.x+a.paddingRight+"px",c.left=""),b.isOriginTop?(c.top=this.position.y+a.paddingTop+"px",c.bottom=""):(c.bottom=this.position.y+a.paddingBottom+"px",c.top=""),this.css(c),this.emitEvent("layout",[this])};var p=l?function(a,b){return"translate3d("+a+"px, "+b+"px, 0)"}:function(a,b){return"translate("+a+"px, "+b+"px)"};h.prototype._transitionTo=function(a,b){this.getPosition();var c=this.position.x,d=this.position.y,e=parseInt(a,10),f=parseInt(b,10),g=e===this.position.x&&f===this.position.y;if(this.setPosition(a,b),g&&!this.isTransitioning)return void this.layoutPosition();var h=a-c,i=b-d,j={},k=this.layout.options;h=k.isOriginLeft?h:-h,i=k.isOriginTop?i:-i,j.transform=p(h,i),this.transition({to:j,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},h.prototype.goTo=function(a,b){this.setPosition(a,b),this.layoutPosition()},h.prototype.moveTo=k?h.prototype._transitionTo:h.prototype.goTo,h.prototype.setPosition=function(a,b){this.position.x=parseInt(a,10),this.position.y=parseInt(b,10)},h.prototype._nonTransition=function(a){this.css(a.to),a.isCleaning&&this._removeStyles(a.to);for(var b in a.onTransitionEnd)a.onTransitionEnd[b].call(this)},h.prototype._transition=function(a){if(!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(a);var b=this._transn;for(var c in a.onTransitionEnd)b.onEnd[c]=a.onTransitionEnd[c];for(c in a.to)b.ingProperties[c]=!0,a.isCleaning&&(b.clean[c]=!0);if(a.from){this.css(a.from);var d=this.element.offsetHeight;d=null}this.enableTransition(a.to),this.css(a.to),this.isTransitioning=!0};var q=j&&d(j)+",opacity";h.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:q,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(m,this,!1))},h.prototype.transition=h.prototype[i?"_transition":"_nonTransition"],h.prototype.onwebkitTransitionEnd=function(a){this.ontransitionend(a)},h.prototype.onotransitionend=function(a){this.ontransitionend(a)};var r={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};h.prototype.ontransitionend=function(a){if(a.target===this.element){var b=this._transn,d=r[a.propertyName]||a.propertyName;if(delete b.ingProperties[d],c(b.ingProperties)&&this.disableTransition(),d in b.clean&&(this.element.style[a.propertyName]="",delete b.clean[d]),d in b.onEnd){var e=b.onEnd[d];e.call(this),delete b.onEnd[d]}this.emitEvent("transitionEnd",[this])}},h.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(m,this,!1),this.isTransitioning=!1},h.prototype._removeStyles=function(a){var b={};for(var c in a)b[c]="";this.css(b)};var s={transitionProperty:"",transitionDuration:""};return h.prototype.removeTransitionStyles=function(){this.css(s)},h.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},h.prototype.remove=function(){if(!i||!parseFloat(this.layout.options.transitionDuration))return void this.removeElem();var a=this;this.on("transitionEnd",function(){return a.removeElem(),!0}),this.hide()},h.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var a=this.layout.options;this.transition({from:a.hiddenStyle,to:a.visibleStyle,isCleaning:!0})},h.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var a=this.layout.options;this.transition({from:a.visibleStyle,to:a.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},h.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},h}var f=a.getComputedStyle,g=f?function(a){return f(a,null)}:function(a){return a.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],e):(a.Outlayer={},a.Outlayer.Item=e(a.EventEmitter,a.getSize,a.getStyleProperty))}(window),function(a){function b(a,b){for(var c in b)a[c]=b[c];return a}function c(a){return"[object Array]"===l.call(a)}function d(a){var b=[];if(c(a))b=a;else if(a&&"number"==typeof a.length)for(var d=0,e=a.length;e>d;d++)b.push(a[d]);else b.push(a);return b}function e(a,b){var c=n(b,a);-1!==c&&b.splice(c,1)}function f(a){return a.replace(/(.)([A-Z])/g,function(a,b,c){return b+"-"+c}).toLowerCase()}function g(c,g,l,n,o,p){function q(a,c){if("string"==typeof a&&(a=h.querySelector(a)),!a||!m(a))return void(i&&i.error("Bad "+this.constructor.namespace+" element: "+a));this.element=a,this.options=b({},this.constructor.defaults),this.option(c);var d=++r;this.element.outlayerGUID=d,s[d]=this,this._create(),this.options.isInitLayout&&this.layout()}var r=0,s={};return q.namespace="outlayer",q.Item=p,q.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},b(q.prototype,l.prototype),q.prototype.option=function(a){b(this.options,a)},q.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),b(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},q.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},q.prototype._itemize=function(a){for(var b=this._filterFindItemElements(a),c=this.constructor.Item,d=[],e=0,f=b.length;f>e;e++){var g=b[e],h=new c(g,this);d.push(h)}return d},q.prototype._filterFindItemElements=function(a){a=d(a);for(var b=this.options.itemSelector,c=[],e=0,f=a.length;f>e;e++){var g=a[e];if(m(g))if(b){o(g,b)&&c.push(g);for(var h=g.querySelectorAll(b),i=0,j=h.length;j>i;i++)c.push(h[i])}else c.push(g)}return c},q.prototype.getItemElements=function(){for(var a=[],b=0,c=this.items.length;c>b;b++)a.push(this.items[b].element);return a},q.prototype.layout=function(){this._resetLayout(),this._manageStamps();var a=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,a),this._isLayoutInited=!0},q.prototype._init=q.prototype.layout,q.prototype._resetLayout=function(){this.getSize()},q.prototype.getSize=function(){this.size=n(this.element)},q.prototype._getMeasurement=function(a,b){var c,d=this.options[a];d?("string"==typeof d?c=this.element.querySelector(d):m(d)&&(c=d),this[a]=c?n(c)[b]:d):this[a]=0},q.prototype.layoutItems=function(a,b){a=this._getItemsForLayout(a),this._layoutItems(a,b),this._postLayout()},q.prototype._getItemsForLayout=function(a){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c];e.isIgnored||b.push(e)}return b},q.prototype._layoutItems=function(a,b){function c(){d.emitEvent("layoutComplete",[d,a])}var d=this;if(!a||!a.length)return void c();this._itemsOn(a,"layout",c);for(var e=[],f=0,g=a.length;g>f;f++){var h=a[f],i=this._getItemLayoutPosition(h);i.item=h,i.isInstant=b||h.isLayoutInstant,e.push(i)}this._processLayoutQueue(e)},q.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},q.prototype._processLayoutQueue=function(a){for(var b=0,c=a.length;c>b;b++){var d=a[b];this._positionItem(d.item,d.x,d.y,d.isInstant)}},q.prototype._positionItem=function(a,b,c,d){d?a.goTo(b,c):a.moveTo(b,c)},q.prototype._postLayout=function(){this.resizeContainer()},q.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var a=this._getContainerSize();a&&(this._setContainerMeasure(a.width,!0),this._setContainerMeasure(a.height,!1))}},q.prototype._getContainerSize=k,q.prototype._setContainerMeasure=function(a,b){if(void 0!==a){var c=this.size;c.isBorderBox&&(a+=b?c.paddingLeft+c.paddingRight+c.borderLeftWidth+c.borderRightWidth:c.paddingBottom+c.paddingTop+c.borderTopWidth+c.borderBottomWidth),a=Math.max(a,0),this.element.style[b?"width":"height"]=a+"px"}},q.prototype._itemsOn=function(a,b,c){function d(){return e++,e===f&&c.call(g),!0}for(var e=0,f=a.length,g=this,h=0,i=a.length;i>h;h++){var j=a[h];j.on(b,d)}},q.prototype.ignore=function(a){var b=this.getItem(a);b&&(b.isIgnored=!0)},q.prototype.unignore=function(a){var b=this.getItem(a);b&&delete b.isIgnored},q.prototype.stamp=function(a){if(a=this._find(a)){this.stamps=this.stamps.concat(a);for(var b=0,c=a.length;c>b;b++){var d=a[b];this.ignore(d)}}},q.prototype.unstamp=function(a){if(a=this._find(a))for(var b=0,c=a.length;c>b;b++){var d=a[b];e(d,this.stamps),this.unignore(d)}},q.prototype._find=function(a){return a?("string"==typeof a&&(a=this.element.querySelectorAll(a)),a=d(a)):void 0},q.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var a=0,b=this.stamps.length;b>a;a++){var c=this.stamps[a];this._manageStamp(c)}}},q.prototype._getBoundingRect=function(){var a=this.element.getBoundingClientRect(),b=this.size;this._boundingRect={left:a.left+b.paddingLeft+b.borderLeftWidth,top:a.top+b.paddingTop+b.borderTopWidth,right:a.right-(b.paddingRight+b.borderRightWidth),bottom:a.bottom-(b.paddingBottom+b.borderBottomWidth)}},q.prototype._manageStamp=k,q.prototype._getElementOffset=function(a){var b=a.getBoundingClientRect(),c=this._boundingRect,d=n(a),e={left:b.left-c.left-d.marginLeft,top:b.top-c.top-d.marginTop,right:c.right-b.right-d.marginRight,bottom:c.bottom-b.bottom-d.marginBottom};return e},q.prototype.handleEvent=function(a){var b="on"+a.type;this[b]&&this[b](a)},q.prototype.bindResize=function(){this.isResizeBound||(c.bind(a,"resize",this),this.isResizeBound=!0)},q.prototype.unbindResize=function(){this.isResizeBound&&c.unbind(a,"resize",this),this.isResizeBound=!1},q.prototype.onresize=function(){function a(){b.resize(),delete b.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var b=this;this.resizeTimeout=setTimeout(a,100)},q.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},q.prototype.needsResizeLayout=function(){var a=n(this.element),b=this.size&&a;return b&&a.innerWidth!==this.size.innerWidth},q.prototype.addItems=function(a){var b=this._itemize(a);return b.length&&(this.items=this.items.concat(b)),b},q.prototype.appended=function(a){var b=this.addItems(a);b.length&&(this.layoutItems(b,!0),this.reveal(b))},q.prototype.prepended=function(a){var b=this._itemize(a);if(b.length){var c=this.items.slice(0);this.items=b.concat(c),this._resetLayout(),this._manageStamps(),this.layoutItems(b,!0),this.reveal(b),this.layoutItems(c)}},q.prototype.reveal=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.reveal()}},q.prototype.hide=function(a){var b=a&&a.length;if(b)for(var c=0;b>c;c++){var d=a[c];d.hide()}},q.prototype.getItem=function(a){for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];if(d.element===a)return d}},q.prototype.getItems=function(a){if(a&&a.length){for(var b=[],c=0,d=a.length;d>c;c++){var e=a[c],f=this.getItem(e);f&&b.push(f)}return b}},q.prototype.remove=function(a){a=d(a);var b=this.getItems(a);if(b&&b.length){this._itemsOn(b,"remove",function(){this.emitEvent("removeComplete",[this,b])});for(var c=0,f=b.length;f>c;c++){var g=b[c];g.remove(),e(g,this.items)}}},q.prototype.destroy=function(){var a=this.element.style;a.height="",a.position="",a.width="";for(var b=0,c=this.items.length;c>b;b++){var d=this.items[b];d.destroy()}this.unbindResize(),delete this.element.outlayerGUID,j&&j.removeData(this.element,this.constructor.namespace)},q.data=function(a){var b=a&&a.outlayerGUID;return b&&s[b]},q.create=function(a,c){function d(){q.apply(this,arguments)}return Object.create?d.prototype=Object.create(q.prototype):b(d.prototype,q.prototype),d.prototype.constructor=d,d.defaults=b({},q.defaults),b(d.defaults,c),d.prototype.settings={},d.namespace=a,d.data=q.data,d.Item=function(){p.apply(this,arguments)},d.Item.prototype=new p,g(function(){for(var b=f(a),c=h.querySelectorAll(".js-"+b),e="data-"+b+"-options",g=0,k=c.length;k>g;g++){var l,m=c[g],n=m.getAttribute(e);try{l=n&&JSON.parse(n)}catch(o){i&&i.error("Error parsing "+e+" on "+m.nodeName.toLowerCase()+(m.id?"#"+m.id:"")+": "+o);continue}var p=new d(m,l);j&&j.data(m,a,p)}}),j&&j.bridget&&j.bridget(a,d),d},q.Item=p,q}var h=a.document,i=a.console,j=a.jQuery,k=function(){},l=Object.prototype.toString,m="object"==typeof HTMLElement?function(a){return a instanceof HTMLElement}:function(a){return a&&"object"==typeof a&&1===a.nodeType&&"string"==typeof a.nodeName},n=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],g):a.Outlayer=g(a.eventie,a.docReady,a.EventEmitter,a.getSize,a.matchesSelector,a.Outlayer.Item)}(window),function(a){function b(a,b){var d=a.create("masonry");return d.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var a=this.cols;for(this.colYs=[];a--;)this.colYs.push(0);this.maxY=0},d.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var a=this.items[0],c=a&&a.element;this.columnWidth=c&&b(c).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},d.prototype.getContainerWidth=function(){var a=this.options.isFitWidth?this.element.parentNode:this.element,c=b(a);this.containerWidth=c&&c.innerWidth},d.prototype._getItemLayoutPosition=function(a){a.getSize();var b=a.size.outerWidth%this.columnWidth,d=b&&1>b?"round":"ceil",e=Math[d](a.size.outerWidth/this.columnWidth);e=Math.min(e,this.cols);for(var f=this._getColGroup(e),g=Math.min.apply(Math,f),h=c(f,g),i={x:this.columnWidth*h,y:g},j=g+a.size.outerHeight,k=this.cols+1-f.length,l=0;k>l;l++)this.colYs[h+l]=j;return i},d.prototype._getColGroup=function(a){if(2>a)return this.colYs;for(var b=[],c=this.cols+1-a,d=0;c>d;d++){var e=this.colYs.slice(d,d+a);b[d]=Math.max.apply(Math,e)}return b},d.prototype._manageStamp=function(a){var c=b(a),d=this._getElementOffset(a),e=this.options.isOriginLeft?d.left:d.right,f=e+c.outerWidth,g=Math.floor(e/this.columnWidth);g=Math.max(0,g);var h=Math.floor(f/this.columnWidth);h-=f%this.columnWidth?0:1,h=Math.min(this.cols-1,h);for(var i=(this.options.isOriginTop?d.top:d.bottom)+c.outerHeight,j=g;h>=j;j++)this.colYs[j]=Math.max(i,this.colYs[j])},d.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var a={height:this.maxY};return this.options.isFitWidth&&(a.width=this._getContainerFitWidth()),a},d.prototype._getContainerFitWidth=function(){for(var a=0,b=this.cols;--b&&0===this.colYs[b];)a++;return(this.cols-a)*this.columnWidth-this.gutter},d.prototype.needsResizeLayout=function(){var a=this.containerWidth;return this.getContainerWidth(),a!==this.containerWidth},d}var c=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){for(var c=0,d=a.length;d>c;c++){var e=a[c];if(e===b)return c}return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size"],b):a.Masonry=b(a.Outlayer,a.getSize)}(window);
(function() {


}).call(this);


// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//






;
