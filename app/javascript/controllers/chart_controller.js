import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = [
        'slider',
        'slideval',
    ];
  
    connect() {
        this.sliderTarget.value = 400;
        this.ctx = document.getElementById('monthlypowerchart');

        this.years = ['1','2','4','6','10','15'];
        this.values = [];
        for(let i = 0; i < this.years.length; i++) {
            this.values.push(parseInt(this.years[i]) * 12 * 150);
        }

        Chart.defaults.backgroundColor = '#FFFFFF';
        Chart.defaults.borderColor = '#36A2EB';
        Chart.defaults.color = '#000';
        Chart.defaults.font.size = 24;
        Chart.defaults.plugins.legend.display = false;

        this.costChart = new Chart(this.ctx, {
            type: 'bar',
            data: {
                labels: this.years,
                datasets: [
                    {
                        data: this.values,
                        borderWidth: 1,
                        borderColor: '#0c4a6e',
                        backgroundColor: '#818cf8',
                    }
                ]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Total Costs over Time'
                    }
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
                                return this.getLabelForValue(value) + ' years';
                            }
                        },
                        grid: {
                            display: false,
                        }
                    },
                },
                layout: {
                    padding: 10 
                },
            },
        });
    }

    setValues() {
        let val = this.sliderTarget.value;
        this.slidevalTarget.innerText = val;
    
        for(let i = 0; i < this.years.length; i++) {
          this.values[i] = [val * this.years[i] * 12];
        };
        this.costChart.update('active');
    }

}