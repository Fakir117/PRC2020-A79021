<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    version="2.0">
    
    <xsl:output method="text" indent="yes" encoding="UTF-8"/>
    
    <xsl:template match="obra">
        <!-- OBRAS: ............................ -->
        ###  http://www.semanticweb.org/diogosilva117/ontologies/2020/1/amd#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        :tipo "<xsl:value-of select="tipo"/>" ;
        <xsl:for-each select="instrumentos/*">
            :temPartitura :<xsl:value-of select="../../@id"/>-p<xsl:value-of select="count(preceding-sibling::*)+1"/> ;
        </xsl:for-each>
        <xsl:if test="compositor">
            :éCompostaPor :<xsl:value-of select="translate(compositor, ' ,', '')"/> ;
        </xsl:if>
        <xsl:if test="arranjo">
            :éArranjadaPor :<xsl:value-of select="translate(arranjo, ' ', '')"/> ;
        </xsl:if>
        :título "<xsl:value-of select="titulo"/>" .
        
        <!-- COMPOSITORES: ............................ -->
        <xsl:if test="compositor|arranjo">
            ###  http://www.semanticweb.org/diogosilva117/ontologies/2020/1/amd#<xsl:value-of select="translate(compositor, ' ,', '')"/>
            :<xsl:value-of select="translate(compositor, ' ,', '')"/> rdf:type owl:NamedIndividual ,
            :Compositor ;
            :nome "<xsl:value-of select="compositor"/>" .
        </xsl:if>
        
        <!-- PARTITURAS: ............................ -->
        <xsl:for-each select="instrumentos/*">
            ###  http://www.semanticweb.org/diogosilva117/ontologies/2020/1/amd#<xsl:value-of select="../../@id"/>-p<xsl:value-of select="count(preceding-sibling::*)+1"/>
            :<xsl:value-of select="../../@id"/>-p<xsl:value-of select="count(preceding-sibling::*)+1"/> rdf:type owl:NamedIndividual ,
            :Partitura ;
            :éTocadaPor :<xsl:value-of select="translate(designacao, ' ', '')"/> ;
            <xsl:if test="partitura/@voz">
                :voz "<xsl:value-of select="partitura/@voz"/>" ;
            </xsl:if>
            <xsl:if test="partitura/@clave">
                :clave "<xsl:value-of select="partitura/@clave"/>" ;
            </xsl:if>
            <xsl:if test="partitura/@afinacao">
                :afinação "<xsl:value-of select="partitura/@afinacao"/>" ;
            </xsl:if>
            :path "<xsl:value-of select="partitura/@path"/>" .
            
            <!-- INSTRUMENTO: ....... -->
            <xsl:if test="not(designacao = preceding::designacao)">
                ###  http://www.semanticweb.org/diogosilva117/ontologies/2020/1/amd#<xsl:value-of select="translate(designacao, ' ', '')"/>
                :<xsl:value-of select="translate(designacao, ' ', '')"/> rdf:type owl:NamedIndividual ,
                :Instrumento ;
                :designação "<xsl:value-of select="designacao"/>" .
            </xsl:if>
        </xsl:for-each>
        
    </xsl:template>
</xsl:stylesheet>