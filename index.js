/*
 * LetterAvatar V.1.1.0
 *
 * I.A
 * Create Letter avatar based on Initials
 * based on https://github.com/abundis29/AvatarName.git
 */
(function(w, d) {

    function LetterAvatar(name, size, color, fontColor) {

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

        context.fillStyle = color ? color : colours[colourIndex];
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.font = Math.round(canvas.width / 2) + "px Roboto";
        context.textAlign = "center";
        context.fontWeight = "bold";
        // context.fillStyle = color = 'white' ? 'black' : "#FFFFFF";
        context.fillStyle = fontColor;
        context.fillText(_initials, size / 2, size / 1.5);

        dataURI = canvas.toDataURL();
        canvas = null;

        return dataURI;
    }

    LetterAvatar.transform = function() {

        Array.prototype.forEach.call(d.querySelectorAll('img[avatar]'), function(img, name) {
            name = img.getAttribute('avatar');
            img.src = LetterAvatar(name, img.getAttribute('width'), img.getAttribute('color'), img.getAttribute('fontColor'));
            img.removeAttribute('avatar');
            img.setAttribute('alt', name);
        });
    };


    // AMD support
    if (typeof define === 'function' && define.amd) {

        define(function() {
            return LetterAvatar;
        });

        // CommonJS and Node.js module support.
    } else if (typeof exports !== 'undefined') {

        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module != 'undefined' && module.exports) {
            exports = module.exports = LetterAvatar;
        }

        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.LetterAvatar = LetterAvatar;

    } else {

        window.LetterAvatar = LetterAvatar;

        d.addEventListener('DOMContentLoaded', function(event) {
            LetterAvatar.transform();
        });
    }

})(window, document);