<?php

/**
 * Quizz extension
 *
 * This file contains the main include file for the ClozeTest extension of
 * MediaWiki.
 *
 * Usage: Add the following line in LocalSettings.php:
 * require_once( "$IP/extensions/ClozeTest/CloseTest.php" );
 *
 * @author Justin Drake <drakefjustin@gmail.com>
 * @copyright Copyright © 2011, Justin Drake
 * @license CC BY-SA 2.0, http://creativecommons.org/licenses/by-sa/2.0/
 * @version 0.0.1
 */
if ( !defined( 'MEDIAWIKI' ) ) {
	echo( "This is an extension to the MediaWiki package and cannot be run standalone.\n" );
	die( -1 );
}

$wgExtensionCredits['parserhook'][] = array(
	'path'           => __FILE__,
	'name'           => 'ClozeTest',
	'author'         => 'Justin Drake',
	'url'            => 'http://www.mediawiki.org/wiki/Extension:ClozeTest',
	'description'    => 'Automatic cloze test generation',
	'descriptionmsg' => 'closetest-desc',
);

$wgResourceModules['ext.InstantCorrection'] = array(
        'scripts' => array(
	        'js/settings.js',
        	'js/plugins.js',
        	'js/buttonBox.js',
        	'js/scoring.js',
        	'js/marking.js',
        	'js/textSuggest.js',
        	'js/dropableInputs.js',
        	'js/keyboard.js',
        	'js/quizUnit.js',
        	'js/slider.js',
        	'js/global.js'
        ),
        'styles' => array('ClozeTest.css'),
        'dependencies' => array('jquery.ui.autocomplete', 'jquery.effects.highlight', 'jquery.ui.draggable', 'jquery.ui.droppable'),
        'localBasePath' => dirname( __FILE__ ),
        'remoteExtPath' => 'ClozeTest'
);

$wgHooks['LinkBegin'][] = 'efLinkBegin';
$wgHooks['BeforePageDisplay'][] = 'efBeforePageDisplay';
$wgHooks['ImageBeforeProduceHTML'][] = 'efImageBeforeProduceHTML';

function efLinkBegin( $skin, $target, &$text, &$customAttribs, &$query, &$options, &$ret ) {
	global $wgOut;

	// Restrict to red links and mainspace links
	if( !$target->isKnown() && $target->getNamespace() === 0) {

		// Define custom attributes for JavaScript
		$customAttribs['linktext'] = $text;
	//	$customAttribs['linktarget'] = $target;
	}

	return true;
}

function efBeforePageDisplay( &$out, &$sk ) {
	global $wgOut;

	$wgOut -> addModules( 'ext.InstantCorrection' );
/*	$wgOut -> addHTML('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>');
	$wgOut -> addHTML('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js"></script>');
	$wgOut -> addHTML('<script type="text/javascript" src="http://localhost/wikilearner/extensions/ClozeTest/ClozeTest.js"></script>');
	$wgOut -> addHTML('<style type="text/css" src="http://localhost/wikilearner/extensions/ClozeTest/ClozeTest.css"></style>');*/

	return true;
}

function efImageBeforeProduceHTML( &$skin, &$title, &$file, &$frameParams, &$handlerParams, &$time, &$res ) {
	$res = '';
	return false;
}