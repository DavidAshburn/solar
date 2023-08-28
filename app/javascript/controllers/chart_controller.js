import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [
        'slider',
        'slideval',
    ];
  
    connect() {
        let initialmonthly = 400;
        this.sliderTarget.value = initialmonthly;
        let ctx = document.getElementById('monthlypowerchart');

        this.years = ['1','2','4','6','8','10','15'];
        this.values = [];
        for(let i = 0; i < this.years.length; i++) {
            this.values.push(parseInt(this.years[i]) * 12 * initialmonthly);
        }

        Chart.defaults.borderColor = "#092038";
        Chart.defaults.backgroundColor  = '#66ccff',
        Chart.defaults.color = '#FFF';
        Chart.defaults.font.size = parseFloat(getComputedStyle(document.documentElement).fontSize);
        Chart.defaults.plugins.legend.display = false;

        this.costChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.years,
                datasets: [
                    {
                        data: this.values,
                        borderWidth: 2,
                        borderColor: '#00728b',
                        hoverBackgroundColor: '#efc634',
                    }
                ]
            },
            options: {
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    title: {
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                        position: 'nearest',
                        external: this.externalTool,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value, index, ticks) {
                                return '$' + Chart.Ticks.formatters.numeric.apply(this, [value, index, ticks]);
                            }
                        },
                        suggestedMax: 80000
                    },
                    x: {
                        ticks: {
                            callback: function(value, index, ticks) {
                                if(ctx.clientWidth >= 573) {
                                    return this.getLabelForValue(value) + ' years';
                                } else {
                                    return this.getLabelForValue(value);  
                                }
                            }
                        },
                        grid: {
                            display: false,
                        }
                    },
                },
                layout: {
                    padding: {
                        top: 30,
                        left: 10,
                        bottom: 0,
                        right: 10
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                onResize: {
                    callback: function() {
                        console.log(ctx.width);
                    }
                },
                legend: {
                    display: false
                }
            },
        });

    }

    setValues() {
        let val = this.sliderTarget.value;
        this.slidevalTarget.innerText = val;
    
        for(let i = 0; i < this.years.length; i++) {
          this.values[i] = val * this.years[i] * 12;
        };
        this.costChart.update('resize');
    }

    getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');
      
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
          tooltipEl.style.borderRadius = '3px';
          tooltipEl.style.color = 'white';
          tooltipEl.style.opacity = 1;
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.transform = 'translate(-50%, 0)';
          tooltipEl.style.transition = 'all .1s ease';
      
          const table = document.createElement('table');
          table.style.margin = '0px';
      
          tooltipEl.appendChild(table);
          chart.canvas.parentNode.appendChild(tooltipEl);
        }
      
        return tooltipEl;
      };

    externalTool = (context) => {
        // Tooltip Element
        const {chart, tooltip} = context;
        const tooltipEl = this.getOrCreateTooltip(chart);
      
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
      
        // Set Text
        if (tooltip.body) {
          const titleLines = tooltip.title || [];
          const bodyLines = tooltip.body.map(b => b.lines);
      
          const tableHead = document.createElement('thead');
      
          titleLines.forEach(title => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = 0;
      
            const th = document.createElement('th');
            th.style.borderWidth = 0;
            const text = document.createTextNode(`${title} year total`);
            th.style.textDecoration = 'underline';
      
            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
          });
      
          const tableBody = document.createElement('tbody');
          bodyLines.forEach((body, i) => {
      
            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.borderWidth = 0;
            tr.style.display = 'flex';
            tr.style.justifyContent = 'center';
      
            const td = document.createElement('td');
            td.style.borderWidth = 0;
            td.style.fontFamily = '"Montserrat", sans-serif';
            td.style.fontSize = '1rem';
            td.style.fontWeight = 'bold';
      
            const text = document.createTextNode(`$${body}`);
      
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
          });
      
          const tableRoot = tooltipEl.querySelector('table');
      
          // Remove old children
          while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
          }
      
          // Add new children
          tableRoot.appendChild(tableHead);
          tableRoot.appendChild(tableBody);
        }
      
        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

        let ctx = document.getElementById('monthlypowerchart')

        let finalColAdjustmentX = 0;
        let finalColAdjustmentY = tooltip.height;

        if(tooltip.title[0] === '15' && ctx.clientWidth < 573) {
            finalColAdjustmentX = tooltip.width / 5;
            finalColAdjustmentY *= 0.8;
        }

        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX - finalColAdjustmentX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY - finalColAdjustmentY + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
        tooltipEl.style.width = 'fit-content';
        tooltipEl.style.blockSize = 'fit-content';
        tooltipEl.style.whiteSpace = 'nowrap';
        tooltipEl.style.backgroundColor = '#092038';
      };
}