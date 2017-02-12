<?php
/**
 * @param $filename
 * @return string
 */
function asset_path($filename)
{
    static $manifest;

    // 1. Pass in the url to the json file
    // 2. JsonManifest checks if the file exists and then decodes the JSON file
    isset($manifest) || $manifest = new JsonManifest(get_stylesheet_directory() . Asset::$dist . '/assets.json');

    // 3. Pass in the $filename ('/styles/main.css'), and the manifest array
    // 4. new Asset function -> matches the filename as KEY, and returns that value
    // 5. by echoing out the function as a string - the __toString function is called automagically
    return (string) new Asset($filename, $manifest);
}
/**
 * Interface ManifestInterface
 * @package Roots\Sage
 * @author QWp6t
 */
interface ManifestInterface
{
    /**
     * Get the cache-busted filename
     *
     * If the manifest does not have an entry for $file, then return $file
     *
     * @param string $file The original name of the file before cache-busting
     * @return string
     */
    public function get($file);

    /**
     * Get the asset manifest
     *
     * @return array
     */
    public function getAll();
}

/**
 * Class Template
 * @package Roots\Sage
 * @author QWp6t
 */
class Asset
{
    public static $dist = '/dist';

    /** @var ManifestInterface Currently used manifest */
    protected $manifest;

    protected $asset;

    protected $dir;

    public function __construct($file, ManifestInterface $manifest = null)
    {
        $this->manifest = $manifest;
        $this->asset = $file;
    }

    public function __toString()
    {
        return $this->getUri();
    }

    public function getUri()
    {
        $file = ($this->manifest ? $this->manifest->get($this->asset) : $this->asset);
        return get_stylesheet_directory_uri() . self::$dist . "/$file";
    }
}

/**
 * Class JsonManifest
 * @package Roots\Sage
 * @author QWp6t
 */
class JsonManifest implements ManifestInterface
{
    /** @var array */
    protected $manifest = [];

    /**
     * JsonManifest constructor
     * @param string $manifestPath Local filesystem path to JSON-encoded manifest
     */
    public function __construct($manifestPath)
    {
        $this->manifest = file_exists($manifestPath) ? json_decode(file_get_contents($manifestPath), true) : [];
    }

    /** @inheritdoc */
    public function get($file)
    {
        return isset($this->manifest[$file]) ? $this->manifest[$file] : $file;
    }

    /** @inheritdoc */
    public function getAll()
    {
        return $this->manifest;
    }
}