solution = function (n, width, height) {
    const result = [];

    const cols = Math.ceil(Math.sqrt(n));
    const rows = Math.ceil(n / cols);
    const colsInFirst = n - (rows - 1) * cols;

    const cardWidth = Math.round(width / cols);
    const cardHeight = Math.round(height / cols);

    const topOffset = (height - cardHeight * rows) / 2;
    const leftOffset = (width - colsInFirst * cardWidth) / 2;

    for (let i = 0; i < colsInFirst; i++) {
        result.push({
            x: Math.round(leftOffset + i * cardWidth),
            y: Math.round(topOffset),
            width: Math.round(cardWidth),
            height: Math.round(cardHeight)
        });
    }

    for (let i = 1; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result.push({
                x: Math.round(j * cardWidth),
                y: Math.round(topOffset + cardHeight * i),
                width: Math.round(cardWidth),
                height: Math.round(cardHeight)
            });
        }
    }

    return result;
};

console.log(solution(1, 100, 100));
