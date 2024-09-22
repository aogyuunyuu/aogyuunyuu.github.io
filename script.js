function updateLineCount() {
    const inputText = document.getElementById("inputText").value;
    const lines = inputText.split(/\r\n|\r|\n/).filter(line => line.trim() !== "");
    document.getElementById("lineCountDisplay").innerText = `入力された行数: ${lines.length} 行`;
}

document.getElementById("inputText").addEventListener("input", updateLineCount);

document.getElementById("copyButton").onclick = function() {
    const outputText = document.getElementById("outputText");
    outputText.select();
    document.execCommand("copy");
    alert("抽出されたテキストがコピーされました！");
};

document.getElementById("clearButton").onclick = function() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").value = "";
    updateLineCount();  // クリア時にも行数をリセット
};

// クッキーにデータを保存する関数
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// クッキーからデータを取得する関数
function getCooki// クッキーにデータを保存する関数
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    // クッキーに保存する際にURIエンコードを行う
    document.cookie = cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

// クッキーからデータを取得する関数
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            // 取得時にデコードを行う
            return decodeURIComponent(c.substring(name.length, c.length));
        }
    }
    return "";
}

// 保存ボタンのイベント処理
document.getElementById("saveButton").onclick = function() {
    const inputText = document.getElementById("inputText").value;
    setCookie("inputText", inputText, 7); // 7日間保存
    alert("入力内容が保存されました！");
};

// ページがロードされた時にクッキーからデータを読み込む
window.onload = function() {
    const savedText = getCookie("inputText");
    if (savedText !== "") {
        document.getElementById("inputText").value = savedText;
        updateLineCount(); // 行数も更新
    }
};

function allowDrop(event) {
    event.preventDefault(); // ドロップを許可
}

function drop(event) {
    event.preventDefault(); // デフォルトの動作をキャンセル
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("inputText").value = e.target.result; // ファイルの内容をテキストエリアにセット
            updateLineCount();  // ファイル読み込み後にも行数を更新
        };
        reader.readAsText(file); // テキストとしてファイルを読み込む
    }
}
