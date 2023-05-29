document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("chart");
    const ctx = canvas.getContext("2d");
  
    function readTextFile(file, callback) {
      const rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, true);
      rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && (rawFile.status === 200 || rawFile.status === 0)) {
          const data = rawFile.responseText;
          callback(data);
        }
      };
      rawFile.send(null);
    }
  
    readTextFile("dados.txt", function(data) {
      const dataArray = data.split("\n").map(line => line.split(","));
  
      const labels = dataArray.map(row => row[0]);
      const values1 = dataArray.map(row => parseFloat(row[1]));
      const values2 = dataArray.map(row => parseFloat(row[2]));
  
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Termômetro 1",
              data: values1,
              borderColor: "red",
              fill: false
            },
            {
              label: "Termômetro 2",
              data: values2,
              borderColor: "blue",
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 6
              }
            }
          },
          plugins: {
            zoom: {
              zoom: {
                wheel: {
                  enabled: true
                },
                pinch: {
                  enabled: true
                },
                mode: 'xy',
              }
            }
          }
        }
      });
    });
  });
  