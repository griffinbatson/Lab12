var retrievalPromise = d3.json("classData.json");

var getImg = function(image){
    return "imgs/"+image.picture;
}

var initGraph = function(students){
        var screen = {width:600, height:600}
        d3.select("#graph")
        .attr("width", screen.width)
        .attr("height", screen.height)
    
    var xscale = d3.scaleLinear()
    .domain([0,50])
    .range([0,screen.width])
    
    var yscale = d3.scaleLinear()
    .domain([0,100])
    .range([screen.height,0])
    
    
var hwMean = function(students){
    var allHw = students.homework.map(function(grade){
        return grade.grade
    })
    return d3.mean(allHw).toFixed(2)
}
var getFinalGrade = function(students){
    var getGrade = students.final.map(function(grade){
        return grade.grade
    })
    return getGrade
}


var drawplot = function(students,screen,xscale,yscale){
    
    d3.select("#graph")
    .selectAll("circle")
    .data(students)
    .enter()
    .append("circle")
    .attr("cx", function(student){
        return xscale(hwMean(student))})
    .attr("cy", function(student){
        return yscale(getFinalGrade(student))
    })
    .attr("r", 4)
    .attr("fill", "red")
    
    .on("mouseenter", function(students){
        console.log("hovering");
        var xPos = d3.event.pageX;
        var yPos = d3.event.pageY;
        d3.select("#tooltip")
        .classed("hidden",false)
        .style("top", yPos+"px")
        .style("left", xPos+"px")
        
        d3.select("#tooltip #img img")
        .attr("src", getImg(students))
    })
}
    drawplot(students,screen,xscale,yscale);}






var successFCN = function(students){
    console.log("data",students);
    initGraph(students);
}

var failFCN = function(errorMsg) {
    console.log("Something went wrong",errorMsg);
    d3.selectAll("body")
    .text("Something went wrong");
}

retrievalPromise.then(successFCN,failFCN);