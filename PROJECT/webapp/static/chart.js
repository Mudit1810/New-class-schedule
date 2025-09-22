// Chart.js Integration

async function loadTeacherClassDistribution() {
    try {
        const response = await fetch('/api/teacher-class-counts');
        const data = await response.json();
        
        const ctx = document.getElementById('teacherClassChart');
        
        // Check if we have the weekly hours limit data
        if (data.limits && data.scheduled) {
            // Calculate percentage utilization for each teacher
            const percentages = data.scheduled.map((hours, i) => {
                const limit = data.limits[i];
                return (hours / limit) * 100;
            });
            
            // Create background colors based on utilization percentage
            const backgroundColors = percentages.map(pct => {
                if (pct > 100) {
                    return 'rgba(239, 68, 68, 0.7)';  // Red for over 100%
                } else if (pct > 85) {
                    return 'rgba(245, 158, 11, 0.7)'; // Yellow for over 85%
                } else {
                    return 'rgba(16, 185, 129, 0.7)'; // Green for under 85%
                }
            });
            
            const borderColors = percentages.map(pct => {
                if (pct > 100) {
                    return 'rgb(220, 38, 38)';  // Dark red
                } else if (pct > 85) {
                    return 'rgb(217, 119, 6)';  // Dark yellow
                } else {
                    return 'rgb(5, 150, 105)';  // Dark green
                }
            });
            
            // Create horizontal bar chart showing utilization
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Weekly Hours',
                        data: data.scheduled,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1,
                        // Add a custom property to store the percentages
                        percentages: percentages,
                        maxValues: data.limits
                    }]
                },
                options: {
                    indexAxis: 'y',  // Make it a horizontal bar chart
                    responsive: true,
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Weekly Hours',
                                color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                            },
                            ticks: {
                                color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                            },
                            grid: {
                                color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                            },
                            // Add max value indicator line
                            afterDataLimits: (scale) => {
                                // Find max value among limits
                                const maxLimit = Math.max(...data.limits);
                                if (scale.max < maxLimit) {
                                    scale.max = maxLimit;
                                }
                            }
                        },
                        y: {
                            ticks: {
                                color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                            },
                            grid: {
                                color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    return context[0].label;
                                },
                                label: function(context) {
                                    const dataset = context.dataset;
                                    const index = context.dataIndex;
                                    const value = dataset.data[index];
                                    const limit = dataset.maxValues[index];
                                    const percentage = dataset.percentages[index];
                                    
                                    return [
                                        `Assigned Hours: ${value}`,
                                        `Maximum Hours: ${limit}`,
                                        `Utilization: ${percentage.toFixed(0)}%`
                                    ];
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Teacher Weekly Hours Utilization',
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text'),
                            font: {
                                size: 16
                            }
                        }
                    }
                },
                plugins: [{
                    id: 'limitLines',
                    afterDraw: (chart) => {
                        const ctx = chart.ctx;
                        const xAxis = chart.scales.x;
                        const yAxis = chart.scales.y;
                        const dataset = chart.data.datasets[0];
                        
                        // Draw the limit lines for each bar
                        for (let i = 0; i < dataset.data.length; i++) {
                            const limit = dataset.maxValues[i];
                            const yPos = yAxis.getPixelForValue(i);
                            const xPos = xAxis.getPixelForValue(limit);
                            
                            ctx.save();
                            ctx.beginPath();
                            ctx.moveTo(xPos, yPos - 10);
                            ctx.lineTo(xPos, yPos + 10);
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = 'rgba(75, 85, 99, 0.8)';
                            ctx.stroke();
                            
                            // Add a small circle at the limit point
                            ctx.beginPath();
                            ctx.arc(xPos, yPos, 4, 0, 2 * Math.PI);
                            ctx.fillStyle = 'rgba(75, 85, 99, 0.8)';
                            ctx.fill();
                            ctx.restore();
                        }
                    }
                }]
            });
        } else {
            // Fall back to doughnut chart if no limits data
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: data.labels,
                    datasets: [{
                        data: data.counts || data.scheduled,
                        backgroundColor: [
                            '#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981',
                            '#3B82F6', '#8B5CF6', '#F472B6', '#F97316', '#34D399',
                            '#6366F1', '#A855F7', '#FB7185', '#FBBF24', '#2DD4BF'
                        ],
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                            labels: {
                                color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.label}: ${context.raw} classes`;
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Teacher Class Distribution',
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text'),
                            font: {
                                size: 16
                            }
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading teacher class distribution:', error);
    }
}

async function loadRoomUsage() {
    try {
        const response = await fetch('/api/room-usage');
        const data = await response.json();
        
        const ctx = document.getElementById('roomUsageChart');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Classes per Room',
                    data: data.counts,
                    backgroundColor: 'rgba(79, 70, 229, 0.6)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                        }
                    },
                    x: {
                        ticks: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                        },
                        grid: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--border')
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                        }
                    },
                    title: {
                        display: true,
                        text: 'Room Usage Analysis',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text'),
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading room usage:', error);
    }
}

async function loadCourseDistribution() {
    try {
        const response = await fetch('/api/course-distribution');
        const data = await response.json();
        
        const ctx = document.getElementById('courseDistributionChart');
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.counts,
                    backgroundColor: [
                        '#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981',
                        '#3B82F6', '#8B5CF6', '#F472B6', '#F97316', '#34D399',
                        '#6366F1', '#A855F7', '#FB7185', '#FBBF24', '#2DD4BF'
                    ],
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text')
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw} classes`;
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Course Distribution',
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text'),
                        font: {
                            size: 16
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error loading course distribution:', error);
    }
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    const teacherChartElement = document.getElementById('teacherClassChart');
    const roomChartElement = document.getElementById('roomUsageChart');
    const courseChartElement = document.getElementById('courseDistributionChart');
    
    if (teacherChartElement) {
        loadTeacherClassDistribution();
    }
    
    if (roomChartElement) {
        loadRoomUsage();
    }
    
    if (courseChartElement) {
        loadCourseDistribution();
    }
});
