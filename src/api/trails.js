export const fetchTrails = async (api) => {
    const response = await fetch(`${api}`, )

    const trails = await response.json()
    if (!trails) throw new Error('missing order data')
    return trails;
}
