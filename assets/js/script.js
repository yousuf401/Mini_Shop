let btnWrap=document.getElementById("btn_wrap")
let search=document.getElementById("search")
let modal=document.getElementById("my_modal_5")
let brandName=document.getElementById("brandName")
let loading=document.getElementById("loading")

const getData=async ()=>{ 
    try {
        let url=await fetch("https://dummyjson.com/products")
        if (!url.ok) {
            throw new Error(`https:${url.status}`)
        }
        let data=await url.json()
        console.log(data)
        displayData(data.products)
        searcControl(data.products)
        
    } catch (error) {
        console.log(error)
    }
}
getData()

const displayData=(items)=>{ 
    btnWrap.innerHTML=''
    setTimeout(() => {
        btnWrap.innerHTML=items.map((item)=>{
        return `
        <div class="card shadow-xl w-4/4 h-full  mx-auto rounded-md bg-black ${item.availabilityStatus !=='In Stock'?'border-2 border-red-600':'border-2 border-black-600'}">
        <div class="card_wrap bg-[#181818] rounded-md">
        <div class="img_inner mx-auto bg-gray-300 rounded-md transition-transform duration-300 hover:scale-105"><img src="${item.images}" alt="" class="w-full"></div>
        <div class="flex items-center justify-between">
        <div class="brand" title="Brand.duoble click for details"><p class="text-gray-300 font-light text-base">${item.brand?item.brand:'No Brand'}</p></div>
        <div class=""><h6 class="text-green-600 border-2 border-[#09652c] font-light text-[10px] text-center rounded-full w-12">${item.availabilityStatus}</h6></div>
        </div>
        <h1 class="text-white mb-6 text-1xl font-bold ">${item.title}</h1>
        <div class=""><p class="text-gray-200 text-[12px] font-medium">${item.description}</p></div>
       <div class="flex justify-around items-center price_wrap">
        <div class=""><p class="text-gray-300 font-semibold">$:${item.price}</p></div>
        <div class=""><p class="text-gray-300 font-light">${item.warrantyInformation}</p></div>
       </div>
      <div>
    <button class="button w-full rounded-lg bg-[#172554] px-4 py-3
                   text-base font-bold text-white
                   transition-all duration-300
                   hover:scale-[1.02] hover:bg-amber-700
                   active:scale-95">
        Add to Cart
    </button>
</div>
        </div>
        </div>`
    }).join(" ")
    let brand = document.querySelectorAll(".brand");
    brand.forEach((x)=>{
        x.addEventListener("dblclick",(e)=>{
            let active=e.currentTarget
            brandName.textContent=active.textContent.trim()
            modal.showModal()
        })
    })
    }, 2000);
}

const searcControl = (x) => {
    search.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            let userSearch = e.target.value.toLowerCase();

            let result = x.filter((i) => {
                return i.title.toLowerCase().includes(userSearch);
            });

            displayData(result);
        }
    });
};

const loadingControl=()=>{
    setTimeout(() => {
        loading.innerHTML=''
    }, 2000);
}
loadingControl()
