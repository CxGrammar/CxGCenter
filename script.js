// 语言资源对象
const resources = {
    en: {
        themeText: "Dark Mode",
        langText: "中文",
        description: "An innovative approach to grammar induction using unsupervised learning techniques",
        dataResources: "Data Resources",
        download: "Download",
        default: "default",
        serviceStatus: "Service Status",
        authors: {
            "Lvxiaowei Xu": "Lvxiaowei Xu",
            "Zhilin Gong": "Zhilin Gong",
            "Anpeng Wu": "Anpeng Wu",
            "Yaowen Xu": "Yaowen Xu",
            "Tianxiang Wang": "Tianxiang Wang",
            "Yayu Cao": "Yayu Cao",
            "Ming Cai": "Ming Cai"
        },
        institution: "Zhejiang University",
        constructicon: "Constructicon Visualization",
        datarepository: "Data Repository",
        coderepository: "Github Repository",
        anthology: "ACL Anthology"
    },
    zh: {
        themeText: "深色模式",
        langText: "English",
        description: "一种利用无监督学习技术进行语法归纳的创新方法",
        dataResources: "数据资源",
        download: "下载",
        default: "默认",
        serviceStatus: "服务状态",
        authors: {
            "Lvxiaowei Xu": "徐吕啸威",
            "Zhilin Gong": "龚之琳",
            "Anpeng Wu": "吴安鹏",
            "Yaowen Xu": "徐耀文",
            "Tianxiang Wang": "王天祥",
            "Yayu Cao": "曹雅钰",
            "Ming Cai": "蔡铭"
        },
        institution: "浙江大学",
        constructicon: "构式网络",
        datarepository: "数据仓库",
        coderepository: "代码仓库",
        anthology: "论文"
    }
};

// 当前语言状态
let currentLang = 'en';

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const jsonViewer = document.getElementById('json-viewer');
const themeText = document.querySelector('.theme-text');
const langText = document.querySelector('.lang-text');

// 主题切换
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateTextContent();
});

// 语言切换
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    updateTextContent();
});

// 更新文本内容
function updateTextContent() {
    const langRes = resources[currentLang];

    // 更新按钮文本
    themeText.textContent = langRes.themeText;
    langText.textContent = langRes.langText;

    // 更新描述
    document.querySelector('.description').textContent = langRes.description;

    // 更新数据资源标题
    document.querySelector('.section-title').textContent = langRes.dataResources;

    // 更新服务状态
    if (document.querySelector('.service-status')) {
        document.querySelector('.service-status').textContent = langRes.serviceStatus;
    }

    // 更新作者信息
    const authors = document.querySelectorAll('.author');
    authors.forEach(author => {
        const originalName = author.getAttribute('data-en');
        author.textContent = langRes.authors[originalName];
    });

    // 更新机构信息
    document.querySelector('.institution').textContent = langRes.institution;

    // 更新可视化按钮
    if (document.querySelector('.constructicon')) {
        document.querySelector('.constructicon').textContent = langRes.constructicon;
    }
    if (document.querySelector('.datarepository')) {
        document.querySelector('.datarepository').textContent = langRes.datarepository;
    }
    if (document.querySelector('.coderepository')) {
        document.querySelector('.coderepository').textContent = langRes.coderepository;
    }
    if (document.querySelector('.anthology')) {
        document.querySelector('.anthology').textContent = langRes.anthology;
    }

    // 重新渲染JSON数据
    renderJsonData();
}

// 从外部加载JSON数据
function loadJsonData() {
    return fetch('data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
            // 返回模拟数据作为后备
            return {
                "en": {
                    "defaults": "1.0.0",
                    "1.0.0": "https://github.com/xlxwalex/CxGCentor/releases/download/v1.0.0/en_data.zip",
                    "1.1.0": "https://github.com/xlxwalex/CxGCentor/releases/download/v1.1.0/en_data_v1.1.zip",
                    "latest": "https://github.com/xlxwalex/CxGCentor/releases/latest/download/en_data.zip"
                },
                "zh": {
                    "defaults": "1.0.2",
                    "1.0.0": "https://github.com/xlxwalex/CxGCentor/releases/download/v1.0.0/zh_data.zip",
                    "1.0.2": "https://github.com/xlxwalex/CxGCentor/releases/download/v1.0.2/zh_data_v1.0.2.zip",
                    "latest": "https://github.com/xlxwalex/CxGCentor/releases/latest/download/zh_data.zip"
                },
                "de": {
                    "defaults": "0.9.0",
                    "0.9.0": "https://github.com/xlxwalex/CxGCentor/releases/download/v0.9.0/de_data.zip",
                    "latest": "https://github.com/xlxwalex/CxGCentor/releases/latest/download/de_data.zip"
                }
            };
        });
}

// 渲染JSON数据
function renderJsonData() {
    loadJsonData().then(jsonData => {
        const langRes = resources[currentLang];
        let html = '';

        for (const [lang, versions] of Object.entries(jsonData)) {
            html += `
                <div class="json-item">
                    <div class="json-key">${lang.toUpperCase()} <span class="version-tag">Language</span></div>
                    <div class="json-content">
            `;

            for (const [version, url] of Object.entries(versions)) {
                const isDefault = version === versions.defaults;
                html += `
                    <div class="json-key">${version} ${isDefault ? `<span class="version-tag">${langRes.default}</span>` : ''}</div>
                    <a href="${url}" class="json-value" target="_blank">${url}</a>
                    <a href="${url}" class="download-btn" download>
                        <i class="fas fa-download"></i> ${langRes.download}
                    </a>
                `;
            }

            html += `
                    </div>
                </div>
            `;
        }

        jsonViewer.innerHTML = html;
    });
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始渲染
    renderJsonData();
});