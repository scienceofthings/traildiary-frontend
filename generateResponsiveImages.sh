targetDirectory="$1"
if ! [ -d "$targetDirectory" ]; then
    echo "Bitte ein valides Verzeichnis angeben."
    exit 1
fi

# parameters:
#   sourceFileName
#   targetFileName
#   size
generateResponsiveImage() {
	mogrify -write "$2"  -filter Triangle -define filter:support=2 -thumbnail "$3" -unsharp 0.25x0.25+8+0.065 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB -strip "$1"
}

# Generates responsive images with various sizes for one given image
# parameters
#   sourceFileName
#   baseForTargetFileName
generateResponsiveImages() {
	fileSizes=( 0210 0715 1020 )
	sourceFileName=$1
	for fileSize in "${fileSizes[@]}"
	do
		destinationFileName="$directoryForResponsiveImages/${2}_w${fileSize}.jpg"
		generateResponsiveImage "$sourceFileName" "$destinationFileName" $fileSize
	done;
}

directoryForResponsiveImages="$targetDirectory/responsiveImages"
if [ -d $directoryForResponsiveImages ]
then
	rm -rf $directoryForResponsiveImages
fi
mkdir -p $directoryForResponsiveImages


baseFileName=1
for FILE in `find $targetDirectory -maxdepth 1 -type f -name "*.jpg" -o -name "*.JPG"  -o -name "*.jpeg"  -o -name "*.JPEG"`;
do
	generateResponsiveImages "$FILE" $baseFileName
	baseFileName=$((baseFileName +1))
done;
