export const removeAllBlocks = async () => {
	await page.evaluate( () => {
		const blocks = wp.data.select( 'core/block-editor' ).getBlocks();
		const clientIds = blocks.map( ( block ) => block.clientId );
		wp.data.dispatch( 'core/block-editor' ).removeBlocks( clientIds );
	} );
};

export const getThirdPartyBlocks = async () => {
	return page.evaluate( () => {
		const blocks = wp.data.select( 'core/blocks' ).getBlockTypes();

		return blocks
			.filter( ( i ) => ! i.name.startsWith( 'core' ) )
			.map( ( i ) => i.title ); // We return a new object the block can have a react element which not serializable and would result in an undefined list
	} );
};

export const getInstalledBlocks = async () => {
	return page.evaluate( () => {
		return wp.data
			.select( 'core/block-directory' )
			.getInstalledBlockTypes();
	} );
};

export const runTest = ( func, errorMessage ) => {
	try {
		func();
	} catch ( e ) {
        console.log( e );
		throw new Error( errorMessage );
	}
};
