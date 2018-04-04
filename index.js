/*
 * NameAvatar V.2
 *
 * I.A
 * Create Letter avatar based on Initials
 * based on https://github.com/abundis29/AvatarName.git
 */

(function(w, d) {

    function NameAvatar(name, size) {

        name = name || '';
        size = size || 60;

        var colours = [
            "#15347C"
        ];
        var nameSplit = String(name).toUpperCase().split(' '),
            initials, colourIndex, canvas, context, dataURI;

        var _initials = name.match(/\b\w/g) || [];
        _initials = ((_initials.shift() || '') + (_initials.pop() || '')).toUpperCase();

        if (nameSplit.length == 1) {
            initials = nameSplit[0] ? nameSplit[0].charAt(0) : '?';
        } else {
            initials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
        }

        if (w.devicePixelRatio) {
            size = (size * w.devicePixelRatio);
        }

        colourIndex = initials != "" ? initials.charCodeAt(0) % colours.length : 0;
        canvas = d.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        context = canvas.getContext("2d");

        context.fillStyle = colours[colourIndex];
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = Math.round(canvas.width / 2) + "px Roboto";
        context.textAlign = "center";
        context.fontWeight = "bold";
        context.fillStyle = "#FFFFFF";
        context.fillText(_initials, size / 2, size / 1.5);

        dataURI = canvas.toDataURL();
        canvas = null;

        return dataURI;
    }

    NameAvatar.transform = function() {

        Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function(img, name) {
            name = img.getAttribute('avatar');
            img.src = NameAvatar(name, img.getAttribute('width'));
            img.removeAttribute('avatar');
            img.setAttribute('alt', name);
        });
    };


    // AMD support
    if (typeof define === 'function' && define.amd) {

        define(function() { return NameAvatar; });

        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {

        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = NameAvatar;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.NameAvatar = NameAvatar;

    } else {

        window.NameAvatar = NameAvatar;

        d.addEventListener('DOMContentLoaded', function(event) {
            NameAvatar.transform();
        });
    }


})(window, document);