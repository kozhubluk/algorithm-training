function solution(container, size, onEnd) {
    let message = '';
    const letters = [];

    const computedStyle = getComputedStyle(container, null);
    const width = parseFloat(computedStyle.getPropertyValue('width')) / size;
    const height = parseFloat(computedStyle.getPropertyValue('height')) / size;

    const paddingLeft = parseFloat(computedStyle.paddingLeft);
    const paddingTop = parseFloat(computedStyle.paddingTop);

    const config = {
        childList: true,
        subtree: false,
    };

    const callback = function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    const letter = node.textContent.trim();
                    const offsetTop = node.offsetTop;
                    const offsetLeft = node.offsetLeft;

                    const position = {
                        letter,
                        top: Math.round((offsetTop - paddingTop) / height), // Нормализуем по высоте ячейки
                        left: Math.round((offsetLeft - paddingLeft) / width), // Нормализуем по ширине ячейки
                    };

                    letters.push(position);

                    letters.sort((a, b) => {
                        if (a.top === b.top) {
                            return a.left - b.left;
                        }
                        return a.top - b.top;
                    });

                    message = letters.map((item) => item.letter).join('');

                    if (letter === '.') {
                        onEnd(message);
                    }
                });
            }
        }
    };

    const observer = new MutationObserver(callback);

    observer.observe(container, config);
}
