
function threePairs(arr)
{       
    if(arr.length<6)    
        return -1

    let freqArr = [0, 0, 0, 0, 0, 0, 0 ]
    for(let i=0; i<arr.length; i++)
    {
        freqArr[arr[i]]++
    }

    if(!freqArr.every(elem=>(elem===0||elem===2)) 
        ||freqArr.every(elem=>(elem===0||elem===2||elem===4)))
    {
        return -1
    }
    
    console.log('3 pairs deteceted score=', 1000)
    return 1000  
}

function streak6(arr)
{
    for(let i=1; i<=6; i++)
    {
        if(!arr.includes(i))
            return false
    }
    console.log('streak6 deteceted score=', 2000)
    return true
}

function streak5(arr)
{
    if(arr.length<5) 
        return -1

    let arrCopy = arr.map(elem=>elem)

    for(let i=2; i<=5; i++)
    {
        if(!arrCopy.includes(i))
            return -1
        
        for(let j=0; j<arrCopy.length; j++)
        {
            if(arrCopy[j]===i)
            {
                arrCopy[j] = 0
                break
            }
        }
    }
    
    if(arrCopy.length===5)
    {
        if(arrCopy.includes(1) || arrCopy.includes(6))
        {
            return 1000
        }
        else
        {
            return -1
        }
    }
    else //length = 6
    {
        let oneCount = 0, fiveCount = 0, sixCount = 0
        for(let i=0; i<arrCopy.length; i++)
        {
            switch(arrCopy[i])
            {
                case 1:
                    oneCount++
                    break
                case 5:
                    fiveCount++
                    break
                case 6:
                    sixCount++
                    break
                case 0:
                    continue
                default:
                    return -1
            }
        }

        if(fiveCount>=2) //5 5
            return -1

        if(sixCount===2) //6 6
            return -1
        else if(sixCount===1)
        {
            if(fiveCount===1) //6 5
                return 1050
            if(oneCount===1) //6 1
                return 1100
        }

        if(oneCount===2) //1 1
            return 1100
        return 1050 // 1 5
    }
}

function comboCount(arr, val)
{
    let count = 0
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i]===val)
            count++
    }

    if(count>=3)
    {
        for(let i=0; i<arr.length; i++)
        {
            if(arr[i]===val)
                arr[i] = 0
        }

        let score = 0
        score =  val*100*(Math.pow(2, count-3))
        
        if(val===1)
            score *= 10

            // console.log('Combo pairs deteceted score')
        return score
    }
    else if(count<3 && count > 0)
    {
        if(val===1)
        {
            return count*100
        }

        if(val===5)
        {
            return count*50
        }
    }
    else if(count===0)
    {
        return 0
    }
    return -1 //less than 3 but greater than 0
}


export {threePairs, streak6, streak5, comboCount}