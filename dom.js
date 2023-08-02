/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('advWalkBtn');
    element.addEventListener('click', function () {
        advWalk(document.getElementById('traversalOutput'), document.querySelector('html'), '');
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('advModifyBtn');
    element.addEventListener('click', function () {
        advModify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('safeRemoveBtn');
    element.addEventListener('click', function () {
        safeRemove();
    });

    element = document.getElementById('selectorRemoveBtn');
    element.addEventListener('click', function () {
        selectorRemove();
    });

    element = document.getElementById('elementSelector');
    element.addEventListener('change', function(event) {
        let content = document.getElementById('elementContent');
        content.value = event.target.value;
    });

    element = document.getElementById('cloneBtn');
    element.addEventListener('click', function () {
        clone();
    });

    element = document.getElementById('advCloneBtn');
    element.addEventListener('click', function () {
        advClone();
    });
}

function walk() {
   let el;
   let traversalOutput = document.getElementById('traversalOutput');

   el = document.getElementById('p1');
   traversalOutput.innerHTML += showNode(el);

   el = el.firstChild;
   traversalOutput.innerHTML += showNode(el);

   el = el.nextSibling;
   traversalOutput.innerHTML += showNode(el);

   el = el.lastChild;
   traversalOutput.innerHTML += showNode(el);

   el = el.parentNode.parentNode.parentNode;
   traversalOutput.innerHTML += showNode(el);

   el = el.querySelector('section > *');
   traversalOutput.innerHTML += showNode(el);
}

function advWalk(output, currEl, depth) {
    if(currEl){
        output.innerHTML += depth + currEl.nodeName + '\n';
        let traverser = document.createTreeWalker(currEl, NodeFilter.SHOW_ELEMENT);
        let currChild = traverser.firstChild();
        while(currChild){
            advWalk(output, currChild, '|--' + depth);
            currChild = traverser.nextSibling();
        }
    }
 }

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    return (`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`);
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advModify() {
    let el = document.querySelector('h1');
    el.innerText = 'DOM Manipulation is Fun!';
    el.style.color = `var(--darkcolor${Math.floor(Math.random() * 6) + 1 })`;

    el = document.getElementById('p1');
    el.classList.toggle('shmancy');
}

// TODO: STYLE OUTPUT TAG
function add() {
    let elementType = document.getElementById('elementSelector').selectedIndex;
    let content = document.getElementById('elementContent').value;
    let time = new Date().toLocaleString();
    let output = document.querySelector('output');

    /* 0: text node, 1: comment, 2: element */
    if(elementType == 0){
        output.innerText += `${content} ${time}`
    } else if(elementType == 1) {
        output.innerHTML += `<!-- ${content} ${time} -->`
    } else {
        output.innerHTML += `<${content}>${time}</${content}>`
    }
}

function remove() {
    document.body.removeChild(document.body.lastChild);
}

function safeRemove() {
    let el = document.body.lastChild;
    let controls = document.getElementById('controls');
    if(!controls.contains(el)){
        document.body.removeChild(el);
    } else if(el.previousSibling){
        el.previousSibling.remove();
    } else if(el.parentNode == document.body) {
        try {
            el.parentNode.previousSibling.remove();
        } catch {
            alert('No More Elements to Delete Safely!');
        }
        
    }
}

function selectorRemove() {
    let CssSelector = document.getElementById('CssSelector').value;
    let elements = document.querySelectorAll(CssSelector);
    elements.forEach((e) => {
        e.remove();
    })
}

function clone() {
    let originalP = document.getElementById('p1');
    let clonedP = originalP.cloneNode(true);
    let output = document.querySelector('output');
    output.appendChild(clonedP);
}

let cardIdx = 0;

function advClone() {
    let template = document.querySelector('template');
    let cloned = template.content.cloneNode(true);
    let output = document.querySelector('output');

    cloned.querySelector('h2').innerText += ' '+cardIdx;
    cloned.querySelector('img').src = `img${Math.floor(Math.random() * 3) + 1 }.jpg`
    output.appendChild(cloned);
    cardIdx++;
}

window.addEventListener('DOMContentLoaded', init);