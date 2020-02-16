<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    
    version="2.0">
    
    <xsl:output method="text" />
    
    <xsl:template match="obra">
        <xsl:variable name="i" select="@id" />
        ###  http://www.semanticweb.org/diogosilva117/ontologies/2020/1/amd#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
            :Obra ;
            <xsl:if test="instrumentos/instrumento">:temPartitura </xsl:if> <xsl:for-each select="instrumentos/instrumento">
                <xsl:choose><xsl:when test="position() != last()" >
                :<xsl:value-of select="$i"/>-p<xsl:number /> ,</xsl:when> </xsl:choose>
                <xsl:if test="position() = last()">
                :<xsl:value-of select="$i"/>-p<xsl:number /> ;</xsl:if></xsl:for-each>
            <xsl:if test="compositor">
            :temCompositor
                :<xsl:value-of select="$i"/>-<xsl:value-of select="compositor"/> ;</xsl:if>
            :título "<xsl:value-of select="titulo"/>"^^xsd:string ;<!--<xsl:if test="compositor">:compositor "<xsl:value-of select="compositor"/>"^^xsd:string ;</xsl:if>-->
            <xsl:if test="arranjo">:arranjo "<xsl:value-of select="arranjo"/>"^^xsd:string ;</xsl:if>
            :tipo "<xsl:value-of select="tipo"/>"^^xsd:string .
        
        <xsl:if test="compositor">
        ###  http://www.semanticweb.org/diogosilva117/ontologies/2020/1/amd#<xsl:value-of select="$i"/>-<xsl:value-of select="compositor"/>
        :<xsl:value-of select="$i"/>-<xsl:value-of select="compositor"/> rdf:type owl:NamedIndividual ,
            :Compositor ;
            :nome "<xsl:value-of select="compositor"/>"^^xsd:string .
        </xsl:if>
        
        <xsl:for-each select="instrumentos/instrumento">
        ###  http://www.semanticweb.org/diogosilva117/ontologies/2020/1/amd#<xsl:value-of select="../../@id"/>-p<xsl:number />
        :<xsl:value-of select="$i"/>-p<xsl:number /> rdf:type owl:NamedIndividual ,
            :Partitura ;
            <xsl:if test="partitura/@voz">:voz "<xsl:value-of select="partitura/@voz"/>"^^xsd:string ;</xsl:if>
            <xsl:if test="partitura/@path">:documento "<xsl:value-of select="partitura/@path"/>"^^xsd:string ;</xsl:if>
            :instrumento "<xsl:value-of select="designacao"/>"^^xsd:string .
        </xsl:for-each>
    </xsl:template>
    
    
</xsl:stylesheet>