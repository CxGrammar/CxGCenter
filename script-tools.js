const resources = {
    en: {
        themeText: {
            dark: "Light Mode",
            light: "Dark Mode"
        },
        langText: "中文",
        backText: "Back to Home",
        description: "An innovative approach to grammar induction using unsupervised learning techniques",
        tools: "Tools",
        dataCollections: "Data Collections",
        serviceStatus: "Service Status",
        viewResource: "View resource",
        noData: "No data available"
    },
    zh: {
        themeText: {
            dark: "浅色模式",
            light: "深色模式"
        },
        langText: "English",
        backText: "返回首页",
        description: "基于无监督的语法归纳创新框架",
        tools: "工具",
        dataCollections: "数据集",
        serviceStatus: "服务状态",
        viewResource: "查看资源",
        noData: "暂无数据"
    }
};

// 当前语言状态
let currentLang = localStorage.getItem('language') || 'en';
// 当前主题状态
let isDarkMode = localStorage.getItem('theme') === 'dark';

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const langToggle = document.getElementById('lang-toggle');
const toolsContainer = document.getElementById('tools-container');
const dataContainer = document.getElementById('data-container');
const themeText = document.querySelector('.theme-text');
const langText = document.querySelector('.lang-text');
const backText = document.querySelector('.back-text');
const themeIcon = themeToggle.querySelector('i');

// 初始化主题和语言
function initializePage() {
    // 设置主题
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    // 设置语言
    updateTextContent();
    
    // 初始渲染
    renderToolsData();
}

// 主题切换
themeToggle.addEventListener('click', () => {
    isDarkMode = !document.body.classList.toggle('dark-mode');
    
    // 更新图标
    themeIcon.classList.toggle('fa-moon', !isDarkMode);
    themeIcon.classList.toggle('fa-sun', isDarkMode);
    
    // 保存主题状态
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    updateTextContent();
});

// 语言切换
langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    // 保存语言状态
    localStorage.setItem('language', currentLang);
    updateTextContent();
    renderToolsData();
});

// 更新文本内容
function updateTextContent() {
    const langRes = resources[currentLang];
    const themeMode = isDarkMode ? 'dark' : 'light';

    // 更新按钮文本
    themeText.textContent = langRes.themeText[themeMode];
    langText.textContent = langRes.langText;
    backText.textContent = langRes.backText;

    // 更新描述
    document.querySelector('.description').textContent = langRes.description;

    // 更新部分标题
    document.querySelectorAll('.section-title').forEach((title, index) => {
        if (index === 0) {
            title.textContent = langRes.tools;
        } else if (index === 1) {
            title.textContent = langRes.dataCollections;
        }
    });

    // 更新服务状态
    if (document.querySelector('.service-status')) {
        document.querySelector('.service-status').textContent = langRes.serviceStatus;
    }
}

// 加载工具和数据
function loadToolsData() {
    return fetch('data/tools.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error loading tools data:', error);
            // 返回模拟数据作为后备
            return {
                "tools": [
                    {
                        "name": "CxG Parser",
                        "description-en": "An advanced parser for construction grammar analysis. Supports multiple languages and provides detailed syntactic and semantic annotations.",
                        "description-zh": "用于构式语法分析的高级解析器。支持多种语言并提供详细的句法和语义注释。",
                        "url": "https://github.com/CxGrammar/CxGParser",
                        "icon": "fas fa-code"
                    },
                    {
                        "name": "Construction Visualizer",
                        "description-en": "Interactive visualization tool for exploring construction networks and relationships between grammatical patterns.",
                        "description-zh": "用于探索构式网络和语法模式之间关系的交互式可视化工具。",
                        "url": "https://cxg.unillm.top/",
                        "icon": "fas fa-project-diagram"
                    },
                    {
                        "name": "Grammar Induction Toolkit",
                        "description-en": "Comprehensive toolkit for unsupervised grammar induction from large text corpora.",
                        "description-zh": "从大型文本语料库中进行无监督语法归纳的综合工具包。",
                        "url": "https://github.com/CxGrammar/GrammarInductionToolkit",
                        "icon": "fas fa-cogs"
                    },
                    {
                        "name": "Pattern Extractor",
                        "description-en": "Extracts grammatical patterns and constructions from raw text using unsupervised methods.",
                        "description-zh": "使用无监督方法从原始文本中提取语法模式和构式。",
                        "url": "https://github.com/CxGrammar/PatternExtractor",
                        "icon": "fas fa-search"
                    }
                ],
                "data": {
                    "ASE 1.0": [
                        {
                            "name": "ASE-GPT Medium",
                            "description-en": "Medium-sized language model trained on ASE corpus with 350M parameters.",
                            "description-zh": "在ASE语料库上训练的中等规模语言模型，参数为3.5亿。",
                            "url": "https://huggingface.co/CxGrammar/ase-gpt-medium",
                            "icon": "fas fa-brain"
                        },
                        {
                            "name": "ASE-BERT Base",
                            "description-en": "BERT model pre-trained on ASE corpus with construction grammar annotations.",
                            "description-zh": "在ASE语料库上预训练的BERT模型，包含构式语法注释。",
                            "url": "https://huggingface.co/CxGrammar/ase-bert-base",
                            "icon": "fas fa-robot"
                        },
                        {
                            "name": "Construction Annotations",
                            "description-en": "Dataset of 1.2M sentences annotated with construction grammar patterns.",
                            "description-zh": "包含120万句子的数据集，带有构式语法模式注释。",
                            "url": "https://github.com/CxGrammar/ASE-Annotations",
                            "icon": "fas fa-tags"
                        },
                        {
                            "name": "ASE-GPT Large",
                            "description-en": "Large language model trained on ASE corpus with 1.2B parameters.",
                            "description-zh": "在ASE语料库上训练的大型语言模型，参数为12亿。",
                            "url": "https://huggingface.co/CxGrammar/ase-gpt-large",
                            "icon": "fas fa-microchip"
                        }
                    ],
                    "MultiLang CxG 2.1": [
                        {
                            "name": "English Constructions",
                            "description-en": "Comprehensive inventory of English constructions with usage examples.",
                            "description-zh": "包含用法示例的英语构式综合库。",
                            "url": "https://github.com/CxGrammar/English-Constructions",
                            "icon": "fas fa-language"
                        },
                        {
                            "name": "Chinese Constructions",
                            "description-en": "Collection of Chinese grammatical constructions with semantic annotations.",
                            "description-zh": "带有语义注释的中文语法构式集合。",
                            "url": "https://github.com/CxGrammar/Chinese-Constructions",
                            "icon": "fas fa-language"
                        },
                        {
                            "name": "German Constructions",
                            "description-en": "German grammatical patterns with frequency and distribution data.",
                            "description-zh": "包含频率和分布数据的德语语法模式。",
                            "url": "https://github.com/CxGrammar/German-Constructions",
                            "icon": "fas fa-language"
                        }
                    ],
                    "CxG-Bench": [
                        {
                            "name": "Evaluation Suite",
                            "description-en": "Benchmark for evaluating construction grammar models across multiple tasks.",
                            "description-zh": "用于评估构式语法模型在多个任务上表现的基准。",
                            "url": "https://github.com/CxGrammar/CxG-Bench",
                            "icon": "fas fa-chart-line"
                        },
                        {
                            "name": "Model Comparisons",
                            "description-en": "Performance comparisons of various models on CxG-Bench tasks.",
                            "description-zh": "各种模型在CxG-Bench任务上的性能比较。",
                            "url": "https://cxg.unillm.top/benchmark",
                            "icon": "fas fa-trophy"
                        }
                    ]
                }
            };
        });
}

// 渲染工具和数据
function renderToolsData() {
    loadToolsData().then(toolsData => {
        // 渲染工具部分
        toolsContainer.innerHTML = '';
        if (toolsData.tools && toolsData.tools.length > 0) {
            toolsData.tools.forEach(tool => {
                const toolCard = createCard(tool);
                toolsContainer.appendChild(toolCard);
            });
        } else {
            toolsContainer.innerHTML = `<div class="no-data">${resources[currentLang].noData}</div>`;
        }

        // 渲染数据部分
        dataContainer.innerHTML = '';
        if (toolsData.data && Object.keys(toolsData.data).length > 0) {
            for (const [collectionName, items] of Object.entries(toolsData.data)) {
                const collectionDiv = document.createElement('div');
                collectionDiv.className = 'data-collection';
                
                const collectionTitle = document.createElement('h3');
                collectionTitle.className = 'collection-title';
                collectionTitle.textContent = collectionName;
                collectionDiv.appendChild(collectionTitle);
                
                const collectionGrid = document.createElement('div');
                collectionGrid.className = 'collection-grid';
                
                if (items && items.length > 0) {
                    items.forEach(item => {
                        const itemCard = createCard(item);
                        collectionGrid.appendChild(itemCard);
                    });
                } else {
                    collectionGrid.innerHTML = `<div class="no-data">${resources[currentLang].noData}</div>`;
                }
                
                collectionDiv.appendChild(collectionGrid);
                dataContainer.appendChild(collectionDiv);
            }
        } else {
            dataContainer.innerHTML = `<div class="no-data">${resources[currentLang].noData}</div>`;
        }
    });
}

// 创建卡片元素
function createCard(item) {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = item.url;
    card.target = '_blank';
    
    // 根据当前语言选择描述
    const description = item[`description-${currentLang}`] || item['description-en'] || '';
    
    card.innerHTML = `
        <div class="card-header">
            <div class="card-icon">
                <i class="${item.icon || 'fas fa-cube'}"></i>
            </div>
            <div>
                <h3 class="card-title">${item.name}</h3>
            </div>
        </div>
        <div class="card-content">
            <p class="card-description">${description}</p>
            <span class="card-link">
                ${resources[currentLang].viewResource} <i class="fas fa-external-link-alt"></i>
            </span>
        </div>
    `;
    
    return card;
}

// 初始化
document.addEventListener('DOMContentLoaded', initializePage);