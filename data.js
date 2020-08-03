const container = document.querySelector('.container')
const carousel = document.querySelector('.carousel')

// Fetches 25 images/gifs from Reddit > Filters them on .jpg > Map them to an array with URLs that end on .jpg
const fetchImages = async () => {
	try {
		const res = await fetch(
			'https://www.reddit.com/r/aww/top/.json?t=all&utm_source=reddit&utm_medium=usertext&utm_name=webdev&utm_content=t3_hyuznw'
		)
		const data = await res.json()

		const filteredImages = data.data.children.filter((child) => {
			return child.data.url_overridden_by_dest.includes('.jpg')
		})

		const images = filteredImages.map((child) => {
			return child.data.url_overridden_by_dest
		})
		return images
	} catch (error) {
		console.log(error)
	}
}

// Get the array with URLs from fetchImages function > Create imgs with their index as HTML class
const createImages = async () => {
	let imageArray = await fetchImages()

	imageArray.forEach((url, index) => {
		const img = document.createElement('img')
		img.src = url
		img.classList = `carousel-img carousel-img-${index}`

		carousel.append(img)
	})
}

createImages()
