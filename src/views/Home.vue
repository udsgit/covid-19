<template>
  <div class="container-fluid">
  <!--XS-->
   <div class="row xs d-md-none">
      <div class="col">
        <div class="row">
          <div class="col px-2" id="columna-1">
            <!--Nombre Region-->
              <div class="row tarjeta mt-2 mb-2 flag-icon-background" style="font-size: 24px; min-height: 40px; line-height: 80%;" >
                <div class="col dato px-0">
                    <span v-if="montado"> {{ regionSeleccionada.nombre | mayuscula }} </span>
                </div>
              </div>
            <!--Media Player-->
              <div class="row tarjeta mb-2 mediaPlayer">
                <img :src="icono.comienzo" class="pointer" @click="cambiarDia('primerDia')">
                <img :src="icono.atras" class="pointer" @click="cambiarDia(-1)">
                <img :src="icono.play" class="pointer" @click="play();" id="play">
                <img :src="icono.stop" class="pointer d-none" @click="stop()" id="stop">
                <img :src="icono.adelante" class="pointer" @click="cambiarDia(1)">
                <img :src="icono.final" class="pointer" @click="cambiarDia('ultimoDia')">
              </div>
            <!--Fecha-->
               <div class="row tarjeta mb-2" style="font-size: 24px; line-height: 80%; min-height: 40px;">
          
                <div class="col calendario p-0">
                   <vc-date-picker
                    :attributes="calendarOptions.attrs"
                    mode="single"
                    v-model="calendarOptions.fechaSeleccionada"
                    :available-dates="calendarOptions.rangoFecha"
                    :min-date="calendarOptions.rangoFecha.start"
                    :max-date="calendarOptions.rangoFecha.end"
                    :columns="1"
                    :rows="1"
                    is-required
                    is-dark
                  />
                </div>
              </div>

            <!--Diagnosticados-->
              <div class="row tarjeta fondo justify-content-start align-items-center" style="background-color: #609fbf; font-size: 24px; line-height: 80%; min-height: 40px;" :style="{ 'background-image': 'url(' + icono.diagnosticado + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.diagnosticados">
                <div class="col-auto px-0 etiquetas" style="font-size: 11px; width:29px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                  DIAGNOSTICADOS
                </div>
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> 
                    <span v-if="windowWidth > 420">
                      {{ consultarDatos("diagnosticados").total | separacion }}
                    </span>
                    <span v-else>
                      {{ consultarDatos("diagnosticados").total | numeroCorto }}
                    </span>
                  </span>
                </div>
              </div>
            <!--Activos-->
              <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #bfbf60; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.activo + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.activos">
                <div class="col-auto px-0 etiquetas" style="font-size: 11px; width:29px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                 ACTIVOS*
                </div>
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> 
                    <span v-if="windowWidth > 420">
                      {{ consultarDatos("activos").total | separacion }}
                    </span>
                    <span v-else>
                      {{ consultarDatos("activos").total | numeroCorto }}
                    </span>
                  </span>
                </div>
              </div>
            <!--Recuperados-->
              <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #60bf66; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.recuperado + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.recuperados">
                <div class="col-auto px-0 etiquetas" style="font-size: 11px; width:29px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                 RECUPERADOS*
                </div>
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> 
                    <span v-if="windowWidth > 420">
                      {{ consultarDatos("recuperados").total | separacion }}
                    </span>
                    <span v-else>
                      {{ consultarDatos("recuperados").total | numeroCorto }}
                    </span>
                  </span>
                </div>
              </div>
            <!--Muertos-->
              <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #bf6060; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.muerto + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.muertos">
            
                <div class="col-auto px-0 etiquetas" style="font-size: 11px; width:29px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                 MUERTOS
              
                </div>               
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> 
                    <span v-if="windowWidth > 420">
                      {{ consultarDatos("muertos").total | separacion }}
                    </span>
                    <span v-else>
                      {{ consultarDatos("muertos").total | numeroCorto }}
                    </span>
                  </span>
                </div>
              </div>
            <!--Info-->
            <div class="row tarjeta mb-2 pointer" style="font-size: 20px; min-height: 40px; line-height: 80%" @click="modal('abrir')">
              DATOS Y CRÉDITOS
            </div>
            <!--Checkbox Chart-->
              <div class="row tarjeta justify-content-around align-items-center" style="min-height: 40px;  line-height: 80%">     
                  <div class="pointer"  @click="cambiarActiveChart('geo')">MAP</div>
                  <div class="pointer"  @click="cambiarActiveChart('pie')">PIE</div>
                  <div class="pointer"  @click="cambiarActiveChart('area')">AREA</div>
              </div>
          </div>
          <div class="col pl-0 pr-2 mt-2" id="columna-2">
            <!--Filtro paises-->
             <div class="row tarjeta mb-2 justify-content-around" id="filtroListado">
               <img :src="icono.diagnosticado" :class="{ activo : filtros.listado == 'diagnosticados.total' }" @click="filtros.listado = 'diagnosticados.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.total">
               <img :src="icono.activo" :class="{ activo : filtros.listado == 'activos.total' }" @click="filtros.listado = 'activos.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.total">
               <img :src="icono.recuperado" :class="{ activo : filtros.listado == 'recuperados.total' }" @click="filtros.listado = 'recuperados.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.total">
               <img :src="icono.muerto" :class="{ activo : filtros.listado == 'muertos.total' }" @click="filtros.listado = 'muertos.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.total">
              </div>
            <!--Listado Paises-->
              <div class="overflow-auto" style="padding: 1px;" id="listado">
                <div  
                  class="row tarjeta fondo justify-content-center align-items-center pointer flag-icon-background" style="font-size: 24px; line-height: 80%; min-height: 40px; text-align: center; border-radius: 40px;" :class="pais.icono" 
                   @click="cambiarRegionYMapa(pais)"
                  :key="i" v-for="(pais,i) in listadoFiltrado">
                  <div class="col" style="line-height: 100%;">
                    {{ ( filtros.listado=="diagnosticados.total"? pais.historial[indexFecha(pais, fecha)].diagnosticados.total : 
                    filtros.listado=="activos.total"? pais.historial[indexFecha(pais, fecha)].activos.total : 
                    filtros.listado=="recuperados.total"? pais.historial[indexFecha(pais, fecha)].recuperados.total : 
                    filtros.listado=="muertos.total"? pais.historial[indexFecha(pais, fecha)].muertos.total : 0) | numeroCorto}} 
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col px-2 mt-2" id="columna-3">
            <!--Geo-->
              <div class="row chartGrande overflow-hidden" style="border-radius: 40px;" v-if="montado && activeChart == 'geo'">
                <div class="col grande" id="geo" style="border-radius: 40px;" @contextmenu.prevent="toggleMenu()">
                    <!--Botones-->
                      <div id="filtros">
                        <img @click="botones.geo = !botones.geo" :src="icono.diagnosticado" id="filtroGeoActivo" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.geo.activo">
                        <img @click="cambiarFiltroGeo($event,'diagnosticados.total')" :src="icono.diagnosticado" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.total">
                        <img @click="cambiarFiltroGeo($event,'activos.total')" :src="icono.activo" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.total">
                        <img @click="cambiarFiltroGeo($event,'recuperados.total')" :src="icono.recuperado" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.total">
                        <img @click="cambiarFiltroGeo($event,'muertos.total')" :src="icono.muerto" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.total">
                      </div>
                    <GChart
                      type="GeoChart"
                      :data="geoChartData"
                      :options="geoChartOptions"
                      :events="geoChartEvents"
                      :settings="chartSettings"
                      :resizeDebounce="500"
                    />
                </div>
              </div>
            <!--Area-->
              <div class="row chartGrande mb-2 overflow-hidden" style="border-radius: 40px;" v-if="montado && activeChart == 'area'">
                <div class="col grande" id="area">
                  <!--Botones-->
                    <div id="filtros">
                      <img @click="botones.area = !botones.area" :src="icono.todos" id="filtroAreaActivo" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.area.activo">
                      <img @click="cambiarFiltroArea($event,'diagnosticados.diario')" :src="icono.diagnosticado" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.diario">
                      <img @click="cambiarFiltroArea($event,'activos.diario')" :src="icono.activo" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.diario">
                      <img @click="cambiarFiltroArea($event,'recuperados.diario')" :src="icono.recuperado" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.diario">
                      <img @click="cambiarFiltroArea($event,'muertos.diario')" :src="icono.muerto" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.diario">
                      <img @click="cambiarFiltroArea($event,'todos.total')" :src="icono.todos" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.todos.total">
                    </div>
                  <GChart
                    type="AreaChart"
                    :data="areaChartData"
                    :options="areaChartOptions"
                  />
                </div>
              </div>
            <!--Pie-->
              <div class="row chartGrande overflow-hidden" style="border-radius: 40px;" v-if="montado && activeChart == 'pie'">
                <div class="col grande" id="pie" style="text-shadow: 0px 0px 2px white; font-family: Avenir; font-weight: 900;">
                  <GChart
                    type="PieChart"
                    :data="pieChartData"
                    :options="pieChartOptions"
                  />
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  
  <!--MD-->
    <div class="d-none d-md-block d-lg-none row md">
      <div class="col">
        <div class="row">
          <div class="px-2 mt-2" id="columna-1">
            <!--Nombre Region-->
              <div class="row tarjeta mb-2 flag-icon-background" style="font-size: 24px;  min-height: 40px; line-height: 80%;">
                <div class="col dato px-0">
                     <span v-if="montado"> {{ regionSeleccionada.nombre | mayuscula }} </span>
                </div>
              </div>
            <!--Media Player-->
              <div class="row tarjeta mb-2 mediaPlayer">
                <img :src="icono.comienzo" class="pointer" @click="cambiarDia('primerDia')">
                <img :src="icono.atras" class="pointer" @click="cambiarDia(-1)">
                <img :src="icono.play" class="pointer" @click="play();" id="play">
                <img :src="icono.stop" class="pointer d-none" @click="stop()" id="stop">
                <img :src="icono.adelante" class="pointer" @click="cambiarDia(1)">
                <img :src="icono.final" class="pointer" @click="cambiarDia('ultimoDia')">
              </div>
            <!--Fecha-->
               <div class="row tarjeta mb-2" style="font-size: 24px; line-height: 80%; min-height: 40px;">
          
                <div class="col calendario p-0">
                   <vc-date-picker
                    :attributes="calendarOptions.attrs"
                    mode="single"
                    v-model="calendarOptions.fechaSeleccionada"
                    :available-dates="calendarOptions.rangoFecha"
                    :min-date="calendarOptions.rangoFecha.start"
                    :max-date="calendarOptions.rangoFecha.end"
                    :columns="1"
                    :rows="1"
                    is-required
                    is-dark
                  />
                </div>
              </div>

            <!--Diagnosticados-->
              <div class="row tarjeta fondo justify-content-start align-items-center" style="background-color: #609fbf; font-size: 24px; line-height: 80%; min-height: 40px;" :style="{ 'background-image': 'url(' + icono.diagnosticado + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.diagnosticados">
                <div class="col-auto px-0" style="font-size: 13px; width:45px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                  <div>DIAGNOSTICADOS</div>
                </div>
                <div class="col px-0" style="line-height: 100%;">
                 <span v-if="montado"> {{ consultarDatos("diagnosticados").total | separacion }} </span>
                </div>
              </div>
            <!--Activos-->
              <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #bfbf60; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.activo + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.activos">
                <div class="col-auto px-0" style="font-size: 13px; width:45px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                 ACTIVOS*
                </div>
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> {{ consultarDatos("activos").total | separacion }} </span>
                </div>
              </div>
            <!--Recuperados-->
              <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #60bf66; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.recuperado + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.recuperados">
                <div class="col-auto px-0" style="font-size: 13px; width:45px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                 RECUPERADOS*
                </div>
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> {{ consultarDatos("recuperados").total | separacion }} </span>
                </div>
              </div>
            <!--Muertos-->
                <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #bf6060; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.muerto + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.muertos">
                  <div class="col-auto px-0" style="font-size: 13px; width:45px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                  MUERTOS
                  </div>               
                  <div class="col px-0" style="line-height: 100%;">
                    <span v-if="montado"> {{ consultarDatos("muertos").total | separacion }} </span>
                  </div>
                </div>
            <!--Info-->
              <div class="row tarjeta mb-2 pointer" style="font-size: 24px; min-height: 40px; line-height: 80%" @click="modal('abrir')">
                DATOS Y CRÉDITOS
              </div>
            <!--Checkbox Chart-->
              <div class="row px-2 tarjeta justify-content-around align-items-center" style="min-height: 40px">     
                  <div class="pointer"  @click="cambiarActiveChart('geo')">MAP</div>
                  <div class="pointer"  @click="cambiarActiveChart('area')">AREA</div>
              </div>
          </div>
          <div class="col pl-0 pr-2 mt-2" id="columna-2">
            <!--Pie-->
              <div class="row chartMini overflow-hidden" style="border-radius: 40px;" v-if="montado">
                <div class="col mini px-0" id="pie" style="text-shadow: 0px 0px 2px white; font-family: Avenir, Helvetica, Arial, sans-serif; font-weight: 900;">
                  <GChart
                    type="PieChart"
                    :data="pieChartData"
                    :options="pieChartOptions"
                  />
                </div>
              </div>
          </div>
          <div class="pr-2 mt-2" id="columna-3">
            <!--Filtro paises-->
             <div class="row tarjeta mb-2" id="filtroListado">
               <img :src="icono.diagnosticado" :class="{ activo : filtros.listado == 'diagnosticados.total' }" @click="filtros.listado = 'diagnosticados.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.total">
               <img :src="icono.activo" :class="{ activo : filtros.listado == 'activos.total' }" @click="filtros.listado = 'activos.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.total">
               <img :src="icono.recuperado" :class="{ activo : filtros.listado == 'recuperados.total' }" @click="filtros.listado = 'recuperados.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.total">
               <img :src="icono.muerto" :class="{ activo : filtros.listado == 'muertos.total' }" @click="filtros.listado = 'muertos.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.total">
              </div>
            <!--Listado Paises-->
              <div class="overflow-auto mb-2" style="padding: 1px;" id="listado">
                <div  
                  class="row tarjeta fondo justify-content-center align-items-center pointer flag-icon-background" style="font-size: 24px; line-height: 80%; min-height: 40px; text-align: center; border-radius: 40px;" :class="pais.icono" 
                  @click="cambiarRegionYMapa(pais)"
                  :key="i" v-for="(pais,i) in listadoFiltrado">
                  <div class="col" style="line-height: 100%;">
                    {{ ( filtros.listado=="diagnosticados.total"? pais.historial[indexFecha(pais, fecha)].diagnosticados.total : 
                    filtros.listado=="activos.total"? pais.historial[indexFecha(pais, fecha)].activos.total : 
                    filtros.listado=="recuperados.total"? pais.historial[indexFecha(pais, fecha)].recuperados.total : 
                    filtros.listado=="muertos.total"? pais.historial[indexFecha(pais, fecha)].muertos.total : 0) | numeroCorto}} 
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col px-2" id="columna-4">
            <!--Geo-->
              <div class="row chartGrande overflow-hidden" style="border-radius: 40px;" v-if="montado && activeChart == 'geo'">
                <div class="col grande" id="geo" style="border-radius: 40px;" @contextmenu.prevent="toggleMenu()">
                    <!--Botones-->
                      <div id="filtros">
                        <img @click="botones.geo = !botones.geo" :src="icono.diagnosticado" id="filtroGeoActivo" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.geo.activo">
                        <img @click="cambiarFiltroGeo($event,'diagnosticados.total')" :src="icono.diagnosticado" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.total">
                        <img @click="cambiarFiltroGeo($event,'activos.total')" :src="icono.activo" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.total">
                        <img @click="cambiarFiltroGeo($event,'recuperados.total')" :src="icono.recuperado" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.total">
                        <img @click="cambiarFiltroGeo($event,'muertos.total')" :src="icono.muerto" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.total">
                      </div>
                    <GChart
                      type="GeoChart"
                      :data="geoChartData"
                      :options="geoChartOptions"
                      :events="geoChartEvents"
                      :settings="chartSettings"
                      :resizeDebounce="500"
                    />
                </div>
              </div>
            <!--Area-->
              <div class="row chartGrande mb-1 overflow-hidden" style="border-radius: 40px;"  v-if="montado && activeChart == 'area'">
                <div class="col grande" id="area">
                  <!--Botones-->
                    <div id="filtros">
                      <img @click="botones.area = !botones.area" :src="icono.todos" id="filtroAreaActivo" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.area.activo">
                      <img @click="cambiarFiltroArea($event,'diagnosticados.diario')" :src="icono.diagnosticado" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.diario">
                      <img @click="cambiarFiltroArea($event,'activos.diario')" :src="icono.activo" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.diario">
                      <img @click="cambiarFiltroArea($event,'recuperados.diario')" :src="icono.recuperado" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.diario">
                      <img @click="cambiarFiltroArea($event,'muertos.diario')" :src="icono.muerto" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.diario">
                      <img @click="cambiarFiltroArea($event,'todos.total')" :src="icono.todos" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.todos.total">
                    </div>
                  <GChart
                    type="AreaChart"
                    :data="areaChartData"
                    :options="areaChartOptions"
                  />
                </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  <!--LG--> 
    <div class="d-none d-lg-block d-xl-none row lg">
      <div class="col">
        <div class="row">
          <div class="px-2" id="columna-1">
            <!--BANDERA-->
              <div class="row tarjeta bandera mt-2 mb-2 flag-icon-background"   :class="regionSeleccionada.icono">
                <div class="col" style="height: 150px;"></div>
              </div>
            <!--Nombre Region-->
              <div class="row tarjeta mb-2 flag-icon-background" style="font-size: 24px; min-height: 40px; line-height: 80%;">
                <div class="col dato px-0">
                    <span v-if="montado"> {{ regionSeleccionada.nombre | mayuscula }} </span>
                </div>
              </div>
            <!--Media Player-->
              <div class="row tarjeta mb-2 mediaPlayer">
                <img :src="icono.comienzo" class="pointer" @click="cambiarDia('primerDia')">
                <img :src="icono.atras" class="pointer" @click="cambiarDia(-1)">
                <img :src="icono.play" class="pointer" @click="play();" id="play">
                <img :src="icono.stop" class="pointer d-none" @click="stop()" id="stop">
                <img :src="icono.adelante" class="pointer" @click="cambiarDia(1)">
                <img :src="icono.final" class="pointer" @click="cambiarDia('ultimoDia')">
              </div>
            <!--Fecha-->
               <div class="row tarjeta mb-2" style="font-size: 24px; line-height: 80%; min-height: 40px;">
                <div class="col calendario p-0">
                   <vc-date-picker
                    :attributes="calendarOptions.attrs"
                    mode="single"
                    v-model="calendarOptions.fechaSeleccionada"
                    :available-dates="calendarOptions.rangoFecha"
                    :min-date="calendarOptions.rangoFecha.start"
                    :max-date="calendarOptions.rangoFecha.end"
                    :columns="1"
                    :rows="1"
                    is-required
                    is-dark
                  />
                </div>
              </div>

            <!--Diagnosticados-->
              <div class="row tarjeta fondo justify-content-start align-items-center" style="background-color: #609fbf; font-size: 24px; line-height: 80%; min-height: 40px;" :style="{ 'background-image': 'url(' + icono.diagnosticado + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.diagnosticados">
                <div class="col-auto px-0" style="font-size: 13px; width:45px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                  <div>DIAGNOSTICADOS</div>
                </div>
                <div class="col px-0" style="line-height: 100%;">
                    <span v-if="montado"> {{ consultarDatos("diagnosticados").total | separacion }} </span>
                </div>
              </div>
            <!--Activos-->
              <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #bfbf60; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.activo + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.activos">
                <div class="col-auto px-0" style="font-size: 13px; width:45px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                 ACTIVOS*
                </div>
                <div class="col px-0" style="line-height: 100%;">
                 <span v-if="montado"> {{ consultarDatos("activos").total | separacion }} </span>
                </div>
              </div>
            <!--Recuperados-->
              <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #60bf66; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.recuperado + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.recuperados">
                <div class="col-auto px-0" style="font-size: 13px; width:45px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                 RECUPERADOS*
                </div>
                <div class="col px-0" style="line-height: 100%;">
                 <span v-if="montado"> {{ consultarDatos("recuperados").total | separacion }} </span>
                </div>
              </div>
            <!--Muertos-->
                <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #bf6060; font-size: 24px; min-height: 40px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.muerto + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.muertos">
            
                <div class="col-auto px-0" style="font-size: 13px; width:45px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                 MUERTOS
              
                </div>               
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> {{ consultarDatos("muertos").total | separacion }} </span>
                </div>
              </div>



            <!--Pie-->
              <div class="row chartMini overflow-hidden" v-if="montado">
                <div class="col mini px-0" id="pie" style="text-shadow: 0px 0px 2px white; font-family: Avenir, Helvetica, Arial, sans-serif; font-weight: 900;">
                  <GChart
                    type="PieChart"
                    :data="pieChartData"
                    :options="pieChartOptions"
                  />
                </div>
              </div>
            <!--Info-->
            <div class="row tarjeta mb-2 pointer" style="font-size: 24px; min-height: 40px; line-height: 80%" @click="modal('abrir')">
              DATOS Y CRÉDITOS
            </div>
            <!--Filtro paises-->
             <div class="row tarjeta mb-2" id="filtroListado">
               <img :src="icono.diagnosticado" :class="{ activo : filtros.listado == 'diagnosticados.total' }" @click="filtros.listado = 'diagnosticados.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.total">
               <img :src="icono.activo" :class="{ activo : filtros.listado == 'activos.total' }" @click="filtros.listado = 'activos.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.total">
               <img :src="icono.recuperado" :class="{ activo : filtros.listado == 'recuperados.total' }" @click="filtros.listado = 'recuperados.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.total">
               <img :src="icono.muerto" :class="{ activo : filtros.listado == 'muertos.total' }" @click="filtros.listado = 'muertos.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.total">
              </div>
            <!--Listado Paises-->
              <div class="overflow-auto mb-2" style="padding: 1px;" id="listado">
                <div  
                  class="row tarjeta fondo justify-content-center align-items-center pointer flag-icon-background m-0 mb-2" style="font-size: 24px; line-height: 80%; min-height: 40px; text-align: center; border-radius: 40px; width: 100%;" :class="pais.icono" 
                  @click="cambiarRegionYMapa(pais)"
                  :key="i" v-for="(pais,i) in listadoFiltrado">
                  <div class="col" style="line-height: 100%;">
                    {{ ( filtros.listado=="diagnosticados.total"? pais.historial[indexFecha(pais, fecha)].diagnosticados.total : 
                    filtros.listado=="activos.total"? pais.historial[indexFecha(pais, fecha)].activos.total : 
                    filtros.listado=="recuperados.total"? pais.historial[indexFecha(pais, fecha)].recuperados.total : 
                    filtros.listado=="muertos.total"? pais.historial[indexFecha(pais, fecha)].muertos.total : 0) | numeroCorto}} 
                  </div>
                </div>
              </div>
          </div>
          <div class="col p-0 mr-2"  id="columna-2">
            <!--Geo-->
              <div class="row chartGrande mt-2 overflow-hidden" style="border-radius: 40px;" v-if="montado && chart.geo">
                <div class="col grande" id="geo" @contextmenu.prevent="toggleMenu()">
                    <!--Botones-->
                      <img @click="agrandarChart('geo')" class="redimencionarGeo" :src="icono.agrandar" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.geo.redimencionar">
                      <div id="filtros">
                        <img @click="botones.geo = !botones.geo" :src="icono.diagnosticado" id="filtroGeoActivo" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.geo.activo">
                        <img @click="cambiarFiltroGeo($event,'diagnosticados.total')" :src="icono.diagnosticado" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.total">
                        <img @click="cambiarFiltroGeo($event,'activos.total')" :src="icono.activo" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.total">
                        <img @click="cambiarFiltroGeo($event,'recuperados.total')" :src="icono.recuperado" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.total">
                        <img @click="cambiarFiltroGeo($event,'muertos.total')" :src="icono.muerto" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.total">
                      </div>
                    <GChart
                      type="GeoChart"
                      :data="geoChartData"
                      :options="geoChartOptions"
                      :events="geoChartEvents"
                      :settings="chartSettings"
                      :resizeDebounce="500"
                    />
                </div>
              </div>
            <!--Area-->
              <div class="row chartGrande mb-2 overflow-hidden" style="border-radius: 40px;" v-if="montado && chart.area">
                <div class="col grande" id="area">
                  <!--Botones-->
                    <img @click="agrandarChart('area')" class="redimencionarArea" :src="icono.agrandar" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.area.redimencionar">
                    <div id="filtros">
                      <img @click="botones.area = !botones.area" :src="icono.todos" id="filtroAreaActivo" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.area.activo">
                      <img @click="cambiarFiltroArea($event,'diagnosticados.diario')" :src="icono.diagnosticado" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.diario">
                      <img @click="cambiarFiltroArea($event,'activos.diario')" :src="icono.activo" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.diario">
                      <img @click="cambiarFiltroArea($event,'recuperados.diario')" :src="icono.recuperado" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.diario">
                      <img @click="cambiarFiltroArea($event,'muertos.diario')" :src="icono.muerto" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.diario">
                      <img @click="cambiarFiltroArea($event,'todos.total')" :src="icono.todos" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.todos.total">
                    </div>
                  <GChart
                    type="AreaChart"
                    :data="areaChartData"
                    :options="areaChartOptions"
                  />
                </div>
              </div>
          </div>   
        </div>
      </div>
    </div>
  
  <!--XL--> 
    <div class="d-none d-xl-block row xl">
      <div class="col">
        <div class="row">
          <div class="px-2" id="columna-1">
            <!--BANDERA-->
              <div class="row tarjeta bandera mt-2 mb-2 flag-icon-background" :class="regionSeleccionada.icono">
                <div class="col" style="height: 225px;"></div>
              </div>
            <!--Nombre Region-->
              <div class="row tarjeta mb-2 flag-icon-background" style="font-size: 33px; min-height: 60px; line-height: 80%">
                <div class="col dato px-0">
                    <span v-if="montado"> {{ regionSeleccionada.nombre | mayuscula }} </span>
                </div>
              </div>
            
            <!--Media Player-->
              <div class="row tarjeta mb-2 mediaPlayer">
                <img :src="icono.comienzo" class="pointer" @click="cambiarDia('primerDia')">
                <img :src="icono.atras" class="pointer" @click="cambiarDia(-1)">
                <img :src="icono.play" class="pointer" @click="play();" id="play">
                <img :src="icono.stop" class="pointer d-none" @click="stop()" id="stop">
                <img :src="icono.adelante" class="pointer" @click="cambiarDia(1)">
                <img :src="icono.final" class="pointer" @click="cambiarDia('ultimoDia')">
              </div>

            <!--Fecha-->
               <div class="row tarjeta mb-2" style="font-size: 33px; line-height: 80%; min-height: 60px;">
                <div class="col calendario p-0">
                   <vc-date-picker
                    :attributes="calendarOptions.attrs"
                    mode="single"
                    v-model="calendarOptions.fechaSeleccionada"
                    :available-dates="calendarOptions.rangoFecha"
                    :min-date="calendarOptions.rangoFecha.start"
                    :max-date="calendarOptions.rangoFecha.end"
                    :columns="1"
                    :rows="1"
                    :key="calendarOptions.key"
                    is-required
                    is-dark
                  />
                </div>
              </div>
            <!--Diagnosticados-->
              <div class="row tarjeta fondo justify-content-start align-items-center" style="background-color: #609fbf; font-size: 33px; line-height: 80%; min-height: 60px;" :style="{ 'background-image': 'url(' + icono.diagnosticado + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.diagnosticados">
                <div class="col-auto px-0" style="font-size: 18px; width:55px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                  <div>DIAGNOSTICADOS</div>
                </div>
                <div class="col px-0" style="line-height: 100%;">
                   <span v-if="montado"> {{ consultarDatos("diagnosticados").total | separacion }} </span>
                </div>
              </div>
            <!--Activos-->
              <div class="row tarjeta fondo justify-content-start align-items-center" style="background-color: #bfbf60; font-size: 33px; min-height: 60px; line-height: 80%;" :style="{ 'background-image': 'url(' + icono.activo + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.activos">
                <div class="col-auto px-0" style="font-size: 18px; width:55px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                  ACTIVOS*
                </div>
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> {{ consultarDatos("activos").total | separacion }} </span>
                </div>
              </div>
            <!--Recuperados-->
              <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #60bf66; font-size: 33px; min-height: 60px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.recuperado + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.recuperados">
                <div class="col-auto px-0" style="font-size: 18px; width:55px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                  RECUPERADOS*
                </div>
                <div class="col px-0" style="line-height: 100%;">
                 <span v-if="montado"> {{ consultarDatos("recuperados").total | separacion }} </span>
                </div>
              </div>
            <!--Muertos-->
                <div class="row  tarjeta fondo justify-content-start align-items-center" style="background-color: #bf6060; font-size: 33px; min-height: 60px; line-height: 80%" :style="{ 'background-image': 'url(' + icono.muerto + ')'}" data-placement="right"  data-toggle="tooltip" title="" :data-original-title="tooltip.muertos">
                  <div class="col-auto px-0" style="font-size: 18px; width:55px; word-wrap: break-word; line-height: 88%; letter-spacing: 0px;">
                    MUERTOS
                  </div>               
                <div class="col px-0" style="line-height: 100%;">
                  <span v-if="montado"> {{ consultarDatos("muertos").total | separacion }} </span>
                </div>
              </div>
            <!--Pie-->
              <div class="row chartMini overflow-hidden" v-if="montado">
                <div class="col mini p-0" id="pie" style="text-shadow: 0px 0px 2px white; font-family: Avenir, Helvetica, Arial, sans-serif; font-weight: 900;">
                  <GChart
                    type="PieChart"
                    :data="pieChartData"
                    :options="pieChartOptions"
                  />
                </div>
              </div>
            <!--Info-->
            <div class="row tarjeta mb-2 pointer" style="font-size: 33px; min-height: 60px; line-height: 80%" @click="modal('abrir')">
              DATOS Y CRÉDITOS
            </div>
          </div>
          <div class="col p-0"  id="columna-2">
            <!--Geo-->
              <div class="row chartGrande mt-2 overflow-hidden" style="border-radius: 40px;" v-if="montado && chart.geo">
                <div class="col grande" id="geo" @contextmenu.prevent="toggleMenu()">
                    <!--Botones-->
                      <img @click="agrandarChart('geo')" class="redimencionarGeo" :src="icono.agrandar" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.geo.redimencionar">
                      <div id="filtros">
                        <img @click="botones.geo = !botones.geo" :src="icono.diagnosticado" id="filtroGeoActivo" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.geo.activo">
                        <img @click="cambiarFiltroGeo($event,'diagnosticados.total')" :src="icono.diagnosticado" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.total">
                        <img @click="cambiarFiltroGeo($event,'activos.total')" :src="icono.activo" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.total">
                        <img @click="cambiarFiltroGeo($event,'recuperados.total')" :src="icono.recuperado" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.total">
                        <img @click="cambiarFiltroGeo($event,'muertos.total')" :src="icono.muerto" :class="{ activo : botones.geo }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.total">
                      </div>
                    <GChart
                      type="GeoChart"
                      :key="geoChartOptions.key"
                      :data="geoChartData"
                      :options="geoChartOptions"
                      :events="geoChartEvents"
                      :settings="chartSettings"
                      :resizeDebounce="500"
                     />
                </div>
              </div>
            <!--Area-->
              <div class="row chartGrande mb-2 overflow-hidden" style="border-radius: 40px;" v-if="montado && chart.area">
                <div class="col grande" id="area">
                  <!--Botones-->
                    <img @click="agrandarChart('area')" class="redimencionarArea" :src="icono.agrandar" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.area.redimencionar">
                    <div id="filtros">
                      <img @click="botones.area = !botones.area" :src="icono.todos" id="filtroAreaActivo" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.area.activo">
                      <img @click="cambiarFiltroArea($event,'diagnosticados.diario')" :src="icono.diagnosticado" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.diario">
                      <img @click="cambiarFiltroArea($event,'activos.diario')" :src="icono.activo" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.diario">
                      <img @click="cambiarFiltroArea($event,'recuperados.diario')" :src="icono.recuperado" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.diario">
                      <img @click="cambiarFiltroArea($event,'muertos.diario')" :src="icono.muerto" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.diario">
                      <img @click="cambiarFiltroArea($event,'todos.total')" :src="icono.todos" :class="{ activo : botones.area }" data-placement="right" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.todos.total">
                    </div>
                  <GChart
                    type="AreaChart"
                    :key="areaChartOptions.key"
                    :data="areaChartData"
                    :options="areaChartOptions"
                  />
                </div>
              </div>
          </div>
          <div class="px-2" id="columna-3">
           <!--Filtro paises-->
             <div class="row tarjeta mt-2" id="filtroListado">
               <img :src="icono.diagnosticado" :class="{ activo : filtros.listado == 'diagnosticados.total' }" @click="filtros.listado = 'diagnosticados.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.diagnosticados.total">
               <img :src="icono.activo" :class="{ activo : filtros.listado == 'activos.total' }" @click="filtros.listado = 'activos.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.activos.total">
               <img :src="icono.recuperado" :class="{ activo : filtros.listado == 'recuperados.total' }" @click="filtros.listado = 'recuperados.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.recuperados.total">
               <img :src="icono.muerto" :class="{ activo : filtros.listado == 'muertos.total' }" @click="filtros.listado = 'muertos.total'" data-placement="left" data-toggle="tooltip" title="" :data-original-title="tooltip.filtros.muertos.total">
              </div>
            <!--Listado Paises-->
              <div class="mb-2 mt-2 overflow-auto" style="padding: 1px;" id="listado">
                <div  
                  class="row tarjeta fondo justify-content-center align-items-center pointer flag-icon-background" style="font-size: 33px; line-height: 80%; min-height: 60px; text-align: center; border-radius: 40px;" :class="pais.icono" 
                  @click="cambiarRegionYMapa(pais)"
                  :key="i" v-for="(pais,i) in listadoFiltrado">
                  <div class="col" style="line-height: 100%;">
                    {{ ( filtros.listado=="diagnosticados.total"? pais.historial[indexFecha(pais, fecha)].diagnosticados.total : 
                    filtros.listado=="activos.total"? pais.historial[indexFecha(pais, fecha)].activos.total : 
                    filtros.listado=="recuperados.total"? pais.historial[indexFecha(pais, fecha)].recuperados.total : 
                    filtros.listado=="muertos.total"? pais.historial[indexFecha(pais, fecha)].muertos.total : 0) | numeroCorto}} 
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  <!--ExtrasGlobales-->
    <!--Modal Copia-->
      <div id="modalCopia">
        <div class="contenido">
           {{ infoDatos}}
        </div>
      </div>

    <!--Modal Info-->
      <div id="modal" @click="modal($event)">
        <div id="modal-content">
          <span id="close" @click="modal('cerrar')">&times;</span>
          <p><span>DATOS OFICIALES:</span> <a href="https://github.com/CSSEGISandData/COVID-19">JHU CSSE</a>.</p>
          <p><span>API REST:</span> <a href="https://github.com/ExpDev07/coronavirus-tracker-api">ExpDev07 coronaVirus-tracker-api</a>.</p>
          <p><span>CHARTS:</span> <a href="https://github.com/devstark-com/vue-google-charts">devstark-com vue-google-charts</a>.</p>
          <p><span>CALENDARIO:</span> <a href="https://github.com/nathanreyes/v-calendar">nathanreyes v-calendar</a>.</p>
          <p><span>ICONOS:</span> <a href="https://www.flaticon.com/authors/freepik">Freepik</a> de <a href="https://www.flaticon.com/">flat-icon</a>.</p>
          <p><span>BANDERAS:</span> <a href="https://github.com/lipis/flag-icon-css">Lipis flag-icon-css</a>.</p>
          <p><span>RECUPERADOS*:</span> Actualmente JHU CSSE ya no proporciona dichos datos, por lo tanto se muestra "0"
           y esta desactivado dichas funciones asociadas.</p>
          <p><span>ACTIVOS*:</span> Como los datos de los recuperados son "0", el calculo no es real, solo se le están restando
           los muertos al total de diagnosticados.</p>
           <div class="custom-control custom-switch">
            <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="audio.switch" >
            <label class="custom-control-label" for="customSwitch1"><img :src="icono.coffin"></label>
           </div>
        </div>
      </div>
    <!--Audio-->
     <audio id="audio" :src="audio.cancion"></audio>
    <!--MenuGeo-->
      <div class="menu" @contextmenu.prevent="toggleMenu()">
        <div class="icons">
          <div class="rotater">
            <div class="btn btn-icon">
               <img :src="icono.mundo"  @click="cambiarRegionYMapa(mundo);">
            </div>
          </div>
          <div class="rotater">
            <div class="btn btn-icon">
              <img :src="icono.america" @click="cambiarRegionYMapa(continentes.america);">
            </div>
          </div>
          <div class="rotater">
            <div class="btn btn-icon">
             <img :src="icono.europa" @click="cambiarRegionYMapa(continentes.europa);">
            </div>
          </div>
          <div class="rotater">
            <div class="btn btn-icon">
             <img :src="icono.africa" @click="cambiarRegionYMapa(continentes.africa);">
            </div>
          </div>
          <div class="rotater">
            <div class="btn btn-icon">
              <img :src="icono.asia" @click="cambiarRegionYMapa(continentes.asia);">
            </div>
          </div>
          <div class="rotater">
            <div class="btn btn-icon">
             <img :src="icono.oceania" @click="cambiarRegionYMapa(continentes.oceania);">
            </div>
          </div>
        </div>
      </div>

</div>
</template>
<script>
import '../../public/style.scss';
import KEYS from '@/keys.json';
import BACKUP from '@/backup.json';
import $ from 'jquery';
export default {
  name: "App",
  data() {
    return {
      infoDatos : "",
      listadoFechas: "",
      backup: "",
      audio: {
        cancion: require("@/assets/musica/coffin-dance.mp3"),
        tag: "",
        indice: "",
        fechaInicio: "",
        activo: "",
        switch: false,
       },
      intervalo: {
        indice: "",
        activo: "",
       },
      tooltip:{
        diagnosticados: "DIAGNOSTICADOS",
        activos: "ACTIVOS*",
        recuperados: "RECUPERADOS*",
        muertos: "MUERTOS",
        filtros: {
          geo: {
            activo: "TOTAL DIAGNOSTICADOS",
            redimencionar: "AGRANDAR",
          },
          area: {
            activo: "TOTAL TODOS",
            redimencionar: "AGRANDAR",
          },
          todos:{
              total: "TOTAL TODOS"
          },
          diagnosticados: {
            total: "TOTAL DIAGNOSTICADOS",
            diario: "DIAGNOSTICADOS DIARIO"
          },
          activos: {
            total: "TOTAL ACTIVOS",
            diario: "ACTIVOS DIARIO"
          },
          recuperados: {
            total: "TOTAL RECUPERADOS",
            diario: "RECUPERADOS DIARIO"
          },
          muertos: {
            total: "TOTAL MUERTOS",
            diario: "MUERTOS DIARIO"
          },
         }
       },
      filtros: {
        geo: "diagnosticado",
        listado: "diagnosticados.total"
       },
      botones: {
        geo: false,
        area: false
       },
      chart: {
        geo: true,
        pie: true,
        area: true
       },
      diferencia: {
        diagnosticados: 0, 
        activos: 0, 
        recuperados: 0, 
        muertos: 0
       },
      regionSeleccionada: "",
      datos: "",
      windowWidth: window.innerWidth,
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px'},
      icono: {
        diagnosticado: require("@/assets/iconos/diagnosticado.png"),
        activo: require("@/assets/iconos/activo.png"),
        recuperado: require("@/assets/iconos/recuperado.png"),
        muerto: require("@/assets/iconos/muerto.png"),
        todos: require("@/assets/iconos/todos.png"),
        calendario: require("@/assets/iconos/calendario.png"),
        info: require("@/assets/iconos/info.png"),
        filtro: require("@/assets/iconos/filtro.png"),
        agrandar: require("@/assets/iconos/agrandar.png"),
        achicar: require("@/assets/iconos/achicar.png"),
        mundo: require("@/assets/iconos/mundo.png"),
        america: require("@/assets/iconos/america.png"),
        europa: require("@/assets/iconos/europa.png"),
        africa: require("@/assets/iconos/africa.png"),
        asia: require("@/assets/iconos/asia.png"),
        oceania: require("@/assets/iconos/oceania.png"),
        comienzo: require("@/assets/iconos/comienzo.png"),
        atras: require("@/assets/iconos/atras.png"),
        play: require("@/assets/iconos/play.png"),
        stop: require("@/assets/iconos/stop.png"),
        adelante: require("@/assets/iconos/adelante.png"),
        final: require("@/assets/iconos/final.png"),
        coffin: require("@/assets/iconos/coffin.png"),
        },
      calendarOptions: {
        key: 0,
        attrs: [],
        rangoFecha: {
          start: "",
          end: "",},
        fechaSeleccionada: "",
        visible: false},
      montado: "",
      filtro: "",
      mundo: "",
      continentes: "",
      continents : [
          ["DZ", "EG", "EH", "LY", "MA", "SD", "SS", "TN","BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG","AO", "CD", "ZR", "CF", "CG", "CM", "GA", "GQ", "ST", "TD","BI", "DJ", "ER", "ET", "KE", "KM", "MG", "MU", "MW", "MZ", "RE", "RW", "SC", "SO", "TZ", "UG", "YT", "ZM", "ZW",	"BW", "LS", "NA", "SZ", "ZA"],
          ["GG", "JE", "AX", "DK", "EE", "FI", "FO", "GB", "IE", "IM", "IS", "LT", "LV", "NO", "SE", "SJ",	"AT", "BE", "CH", "DE", "DD", "FR", "FX", "LI", "LU", "MC", "NL",	"BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SU", "SK", "UA","AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "RS", "PT", "SI", "SM", "VA", "YU"],
          ["BM", "CA", "GL", "PM", "US",	"AG", "AI", "AN", "AW", "BB", "BL", "BS", "CU", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "TC", "TT", "VC", "VG", "VI",	"BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV",	"AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE"],
          ["TM", "TJ", "KG", "KZ", "UZ","CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW",	"AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK",	"BN", "ID", "KH", "LA", "MM", "BU", "MY", "PH", "SG", "TH", "TL", "TP", "VN",	"AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "NT", "SY", "TR", "YE", "YD"],
          ["AU", "NF", "NZ","FJ", "NC", "PG", "SB", "VU","FM", "GU", "KI", "MH", "MP", "NR", "PW",	"AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"]
        ],
      activeChart: "geo",
      fechaInicio: new Date("1/22/20"),
      paises: [],
      chartSettings: {packages: ['geochart','corechart','bar'], mapsApiKey: KEYS.API_KEY},
      geoChartOptions: {
          key: 0,
          tipoDatos: "diagnosticados.total",
          enableRegionInteractivity: true,
          legend: {
            textStyle: {
              color: 'transparent'
            }
          },
          resolution: "world",
          region: "world",
          colorAxis: {
            values: [1,1000,10000,100000,1000000],
            colors: ["60bf66","609fbf","bfbf60","bf6060","black"]
          },
          domain: "IN",
          datalessRegionColor: "white",
          defaultColor: "white",
          backgroundColor: {
              fill: "222222",
            },
          tooltip: {
          textStyle: {
            color: "black",
            fontName: "Arial",
            fontSize: 15,
            bold: true,
            italic: false
            }
          }
        },
      geoChartEvents: {
          regionClick: e => {
            if (this.paises.some(p => p.codigo == e.region)) {
               this.geoChartOptions.region = e.region;
               this.regionSeleccionada = this.buscarRegion(e.region);
            }
          },
        },
      areaChartOptions: {
        key: 0,
        tipoDatos: "todos.total",
        tooltip:{
          trigger: "focus"
         },
        vAxis: {
          textPosition: "out",
          textStyle:{
            color: "white",
            bold: true,
            fontSize: 13
          },
          format: "short",
          gridlines: {
            color: "grey",
            count: -1
          },
          minorGridlines: {
            count: 0
          },},
        lineWidth: 5,
        hAxis: {
          textPosition: "out",
          textStyle: {
            color: "white",
            bold: true,
            fontSize: 13
          },
          format: "dd/M",
          gridlines: {
            color:"grey",
            count: -1,
          },
          minorGridlines:{
            count: 0,
          }
          },
        selectionMode: null,
        interpolateNulls: false,
        isStacked: false,
        pointsVisible: false,
        legend: {
          maxLines: 0,
          alignment: "center",
          position: "none",
          textStyle: {
            color: "white",
            bold: true,
            fontSize: 12
          }
         },
        focusTarget: "category",
        explorer: {
          axis: "horizontal",
          actions: ['dragToZoom', 'rightClickToReset'],
          keepInBounds: true,
         },
        colors: ["609fbf","bfbf60","60bf66","bf6060"],
        chartArea: {
          right: 5,
          left: 40,
          top: 20,
          bottom: 20,
         },
        backgroundColor: "222222",
        areaOpacity: .5,
        enableInteractivity: true,
        animation: {
          startup: false,
          duration: 0,
         }},
      pieChartOptions: {
        colors: ["bfbf60"/*,"60bf66"*/,"bf6060"],
        is3D: true,
        pieHole: 0.8,
        pieStartAngle: 0,
        pieSliceBorderColor: "222222",
        pieSliceTextStyle: {
          color: "black",
          bold: true,
          fontSize: 12,
        },
        chartArea:{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        legend: "none",
        sliceVisibilityThreshold: 0,
        backgroundColor: "222222",
        enableInteractivity: true,
        },
        };},
  methods: {
    crearPaisesYRellenarDatos(locations){
       Array.from(locations).forEach(p => {
        if (!this.existePais(p.country)) {
          this.crearPais(p);
        }else{
          this.buscarPais(p.country).subRegiones = true;
        }
        Object.keys(p.timelines.confirmed.timeline).forEach((fecha,i) => {
          this.rellenarDatos(p,fecha,i);
        });
      });
     },
    funcionesIniciales(datos){
      this.listadoFechas = Object.keys(datos.locations[0].timelines.confirmed.timeline);
      this.crearContinentes();
      this.crearMundo();
      this.crearPaisesYRellenarDatos(datos.locations);
      this.rellenarDatosSubRegiones();
      this.crearFechaInicial();
      this.modificarChart();
      this.regionSeleccionada = this.buscarRegion("world");
      this.filtro = "diagnosticados";
      this.buscarRegion("VA").nombre = "Vatican";
      this.buscarRegion("AD").icono = "flag-icon-xx";
      this.audio.tag = document.querySelector("#audio");
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      })
      this.modalBackup();
      this.montado = true;
     },
    modalBackup(){
      let modalCopia = document.querySelector("#modalCopia");
      modalCopia.style.display = "block";
      setTimeout(() => { modalCopia.style.opacity = "0";}, 5000);
      setTimeout(() => { modalCopia.style.display = "none";}, 8000);
     },
    cargarBackup(error){
 
        console.log(error);
  
      
      this.funcionesIniciales(this.backup.datos);
      this.infoDatos = "Cargando copia local actualizada...";
     },
    guardarBackup(datos){
      let backup = {
        "datos" : datos,
        "version" : Object.keys(datos.locations[0].timelines.confirmed.timeline).length
      }
      localStorage.setItem('backup',JSON.stringify(backup));
      this.infoDatos = "Cargando nuevos datos del servidor...";
     },
    comprobarBackup(){
      this.backup = localStorage.getItem('backup') ? JSON.parse(localStorage.getItem('backup')) : BACKUP;
     },
    existeNuevaVersion(resJSON){
      if(Object.keys(resJSON.locations[0].timelines.confirmed.timeline).length <= this.backup.version){
        throw Error("version vieja");
      }
      return resJSON;
     },
    respuestaOk(res){
      if (!res.ok) {
        throw Error("NO OK: " + res.statusText);
      }
      return res.json();
     },
    modal(opcion){
       let modal = document.querySelector("#modal");
      switch(opcion){
        case "abrir":
          modal.style.display = "flex";
          break;
        case "cerrar":
          modal.style.display = "none";
          break;
        default:
          if (event.target == modal){
            modal.style.display = "none";
          }
          break;
      }
     },
    play(){
      document.querySelectorAll("#play").forEach(e => e.classList.add("d-none")); 
      document.querySelectorAll("#stop").forEach(e => e.classList.remove("d-none"));
      this.intervalo.indice = setInterval(() => this.cambiarDia(1), 1000);
      this.intervalo.activo = true;
     },
    stop(){
      document.querySelectorAll("#stop").forEach(e => e.classList.add("d-none"));
      document.querySelectorAll("#play").forEach(e => e.classList.remove("d-none"));
      clearInterval(this.intervalo.indice);
      this.audio.tag.pause();
      this.audio.tag.currentTime = 0;
      this.intervalo.activo = false;
      this.audio.activo = false;
     },
    cambiarActiveChart(opcion){
      this.activeChart = opcion;
      $(function () {
        $('[data-toggle="tooltip"]').tooltip()
      });
     },
    cambiarFiltroArea(e,opcion){
      let activo = document.querySelector("#filtroAreaActivo");
      switch(opcion){
        case "todos.total":
          activo.src = this.icono.todos;
          this.tooltip.filtros.area.activo = this.tooltip.filtros.todos.total;
          break;
        case "diagnosticados.diario":
          activo.src = this.icono.diagnosticado;
          this.tooltip.filtros.area.activo = this.tooltip.filtros.diagnosticados.diario;
          break;
        case "activos.diario":
          activo.src = this.icono.activo;
          this.tooltip.filtros.area.activo = this.tooltip.filtros.activos.diario;
          break;
        case "recuperados.diario":
          activo.src = this.icono.recuperado;
          this.tooltip.filtros.area.activo = this.tooltip.filtros.recuperados.diario;
          break;
        case "muertos.diario":
          activo.src = this.icono.muerto;
          this.tooltip.filtros.area.activo = this.tooltip.filtros.muertos.diario;
          break;
        default:
          break;
      }
      this.areaChartOptions.tipoDatos = opcion;
      this.botones.area = !this.botones.area;
     },
    cambiarFiltroGeo(e,opcion){
      let activo = document.querySelector("#filtroGeoActivo");
        switch(opcion){
          case "diagnosticados.total":
            activo.src = this.icono.diagnosticado;
            this.tooltip.filtros.geo.activo = this.tooltip.filtros.diagnosticados.total;
            break;
          case "activos.total":
            activo.src = this.icono.activo;
            this.tooltip.filtros.geo.activo = this.tooltip.filtros.activos.total;
            break;
          case "recuperados.total":
            activo.src = this.icono.recuperado;
            this.tooltip.filtros.geo.activo = this.tooltip.filtros.recuperados.total;
            break;
          case "muertos.total":
            activo.src = this.icono.muerto;
            this.tooltip.filtros.geo.activo = this.tooltip.filtros.muertos.total;
            break;
          default:
            break;
        }
        this.geoChartOptions.tipoDatos = opcion;
        this.botones.geo = !this.botones.geo;
      },
    cambiarDia(dia){
      let nuevaFecha = new Date(this.calendarOptions.fechaSeleccionada);
      switch(dia){
        case -1:
        case 1:
          nuevaFecha.setDate(nuevaFecha.getDate() + dia);
          break;
        case "primerDia":
          nuevaFecha = new Date(this.calendarOptions.rangoFecha.start);
          break;
        case "ultimoDia":
          nuevaFecha = new Date(this.calendarOptions.rangoFecha.end);
          break;
      }
      if(nuevaFecha >= this.calendarOptions.rangoFecha.start && nuevaFecha <= this.calendarOptions.rangoFecha.end){
        this.calendarOptions.fechaSeleccionada = nuevaFecha;
        this.calendarOptions.key++;
        if(this.intervalo.activo && this.audio.activo == false && this.audio.switch && this.consultarDatos("diagnosticados").total > 100000){
          this.audio.tag.play();
          this.audio.activo = true;
        }
        if(this.audio.switch == false){
          this.audio.activo = false;
          this.audio.tag.pause();
        }
      }else{
        this.stop();
      }
     },
    cambiarColorArea(opcion){
        switch(opcion){
          case "diagnosticados":
            this.areaChartOptions.colors = ["609fbf"];
            break;
          case "activos":
            this.areaChartOptions.colors = ["bfbf60"];
            break;
          case "recuperados":
            this.areaChartOptions.colors = ["60bf66"];
            break;
          case "muertos":
            this.areaChartOptions.colors = ["bf6060"];
            break;
          case "todos":
            this.areaChartOptions.colors = ["609fbf","bfbf60",/*"60bf66",*/"bf6060"];
            break;
          default:
            break;
        }
      },
    agrandarChart(opcion){
      switch(opcion){
        case "geo":
          this.chart.area = !this.chart.area;
          if(this.chart.area){
            document.querySelector(".redimencionarGeo").src = this.icono.agrandar;
            this.tooltip.filtros.geo.redimencionar = "AGRANDAR";
          }else{
            document.querySelector(".redimencionarGeo").src = this.icono.achicar;
            this.tooltip.filtros.geo.redimencionar = "ACHICAR";
          }
          this.geoChartOptions.key++;
          break;
        case "area":
          this.chart.geo = !this.chart.geo;
          if(this.chart.geo){
            document.querySelector(".redimencionarArea").src = this.icono.agrandar;
            this.tooltip.filtros.area.redimencionar = "AGRANDAR";
          }else{
            document.querySelector(".redimencionarArea").src = this.icono.achicar;
            this.tooltip.filtros.area.redimencionar = "ACHICAR";
          }
          this.areaChartOptions.key++;
          break;
        case "pie":
          break;
        default:
          break;
      }
       $(function () {
        $('[data-toggle="tooltip"]').tooltip()
        })
     },
    cerrarMenu(){
      document.querySelector(".menu").classList.remove('active');
     },
    toggleMenu(){
        document.querySelector(".menu").style.top = event.clientY - 30 + "px";
        document.querySelector(".menu").style.left = event.clientX - 30 + "px";
        document.querySelector(".menu").classList.toggle('active');
      },
    cambiarRegionYMapa(region){
        this.regionSeleccionada = region;
        this.geoChartOptions.region = region.codigo != "XX" ? region.codigo : "world";
        this.cerrarMenu();
      },
    buscarRegion(codigo){
        switch(codigo){
          case "world":
            return this.mundo;
          case "002":
            return this.continentes.africa;
          case "009":
            return this.continentes.oceania;
          case "019":
            return this.continentes.america;
          case "142":
            return this.continentes.asia;
          case "150":
            return this.continentes.europa;
          default:
            return this.paises.find(e => e.codigo == codigo);
        }   
      },
    consultarDatos(tipoDato){
        switch(tipoDato){
          case "diagnosticados":
            return this.regionSeleccionada.historial[this.indexFecha(this.regionSeleccionada, this.fecha)].diagnosticados;
          case "activos":
            return this.regionSeleccionada.historial[this.indexFecha(this.regionSeleccionada, this.fecha)].activos;
          case "recuperados":
            return this.regionSeleccionada.historial[this.indexFecha(this.regionSeleccionada, this.fecha)].recuperados;
          case "muertos":
            return this.regionSeleccionada.historial[this.indexFecha(this.regionSeleccionada, this.fecha)].muertos;
          default:
            return 0;
        }
      },
    buscarPais(nombrePais){
        return this.paises.find(e => e.nombre == nombrePais);
      },
    crearContinentes(){
        this.continentes = {
          "africa":{nombre:"africa",codigo:"002",historial: this.listadoFecha(), icono: "flag-icon-002"}, 
          "oceania":{nombre:"oceania",codigo:"009",historial: this.listadoFecha(), icono: "flag-icon-009"},
          "america":{nombre:"america",codigo:"019",historial: this.listadoFecha(), icono: "flag-icon-019"},
          "asia":{nombre:"asia",codigo:"142",historial: this.listadoFecha(), icono: "flag-icon-142"},
          "europa":{nombre:"europa",codigo:"150",historial: this.listadoFecha(), icono: "flag-icon-150"},
          "sin_definir" :{nombre: "sin definir",codigo: "sin definir" ,historial: this.listadoFecha(), icono: "flag-icon-XX"}
        };
      },
    crearMundo(){
        this.mundo = {
          nombre:"mundo",codigo:"world",historial: this.listadoFecha(), icono: "flag-icon-world"
        };
      },
    crearPais(p){
        this.paises.push({
          nombre: p.country,
          continente: this.continentByCountryCode(p.country_code),
          codigo: p.country_code,
          poblacion: p.country_population,
          historial: this.listadoFecha(),
          icono: "flag-icon-" + p.country_code.toLowerCase(),
          subRegiones: false
        });
      },
    crearFechaInicial(){
        let fechaInicio = new Date("1/22/20");
        let ultimaFecha = new Date("1/22/20");
        ultimaFecha.setDate(ultimaFecha.getDate() + this.paises[0].historial.length - 1);
        this.calendarOptions.fechaSeleccionada = ultimaFecha;
        this.crearFechaCalendario(fechaInicio,ultimaFecha);
      },
    rellenarDatosSubRegiones(){
        let regionesConSubRegiones = this.paises.filter(e => e.subRegiones);
        regionesConSubRegiones.push(
          this.mundo,
          this.continentes.america,
          this.continentes.europa,
          this.continentes.asia,
          this.continentes.africa,
          this.continentes.oceania,
        );
        regionesConSubRegiones.forEach(p => {
          p.historial.map(e => e.fecha).forEach((fecha,i) => {
            if(i == 0){
              this.diferencia.diagnosticados = 0;
              this.diferencia.activos = 0;
              this.diferencia.muertos = 0;
            }
            p.historial[this.indexFecha(p, fecha)].diagnosticados.diario = p.historial[this.indexFecha(p, fecha)].diagnosticados.total - this.diferencia.diagnosticados;
            p.historial[this.indexFecha(p, fecha)].activos.diario = p.historial[this.indexFecha(p, fecha)].activos.total - this.diferencia.activos;
            p.historial[this.indexFecha(p, fecha)].muertos.diario = p.historial[this.indexFecha(p, fecha)].muertos.total - this.diferencia.muertos;
            this.diferencia.diagnosticados = p.historial[this.indexFecha(p, fecha)].diagnosticados.total;
            this.diferencia.activos = p.historial[this.indexFecha(p, fecha)].activos.total;
            this.diferencia.muertos = p.historial[this.indexFecha(p, fecha)].muertos.total;
          });
        })
      },
    rellenarDatos(p,fecha,i){
        if(i == 0){
          this.diferencia.diagnosticados = 0;
          this.diferencia.activos = 0;
          this.diferencia.muertos = 0;
        }
        let pais = this.buscarPais(p.country);
        let continente = this.continentByCountryCode(p.country_code);
        let indexFecha = this.indexFecha(pais, fecha);
        let diagnosticados = p.timelines.confirmed.timeline[fecha];
        let muertos = p.timelines.deaths.timeline[fecha];
        let activos = diagnosticados - muertos;
        //DIAGNOSTICADOS
        pais.historial[indexFecha].diagnosticados.total += diagnosticados;
        this.continentes[continente].historial[indexFecha].diagnosticados.total += diagnosticados;
        this.mundo.historial[indexFecha].diagnosticados.total += diagnosticados;
        //ACTIVOS
        pais.historial[indexFecha].activos.total += activos;
        this.continentes[continente].historial[indexFecha].activos.total += activos;
        this.mundo.historial[indexFecha].activos.total += activos;
        //MUERTOS
        pais.historial[indexFecha].muertos.total += muertos;
        this.continentes[continente].historial[indexFecha].muertos.total += muertos;
        this.mundo.historial[indexFecha].muertos.total += muertos;
        //DIARIO
        if(!pais.subRegiones){
          pais.historial[indexFecha].diagnosticados.diario = diagnosticados - this.diferencia.diagnosticados;
          pais.historial[indexFecha].activos.diario = activos - this.diferencia.activos;
          pais.historial[indexFecha].muertos.diario = muertos - this.diferencia.muertos;
        }
        this.diferencia.diagnosticados = diagnosticados;
        this.diferencia.activos = activos;
        this.diferencia.muertos = muertos;
      },
    modificarChart(){
      switch(this.pantalla){
        case "XS":
          this.pieChartOptions.pieSliceTextStyle.fontSize = 20;
          break;
        case "MD":
          this.cambiarActiveChart('geo');
          //PIE
          this.pieChartOptions.pieSliceTextStyle.fontSize = 16;
          break;
        case "LG":
          //PIE
          this.pieChartOptions.pieSliceTextStyle.fontSize = 12;
          break;
        case "XL":
          //PIE
          this.pieChartOptions.pieSliceTextStyle.fontSize = 14;
          break;
        default:
          break;
      }},
    crearFechaCalendario(fechaInicio,fechaFin){
      this.calendarOptions.rangoFecha.start = fechaInicio;
      this.calendarOptions.rangoFecha.end = fechaFin;
      this.calendarOptions.attrs.pop();
      this.calendarOptions.attrs.push(
        {
          key: 'today',
          highlight: "blue",
          dates: {
            start: fechaInicio,
            end: fechaFin
          }
        })
      },
    fechaCompleta(fecha){
      let day = fecha.getDate();
      let month = fecha.getMonth() + 1;
      let year = fecha.getFullYear().toString().substr(-2);
      //let hours = fecha.getHours();
      //let minutes = fecha.getMinutes();
      //let seconds = fecha.getSeconds();
      //let timeZone = fecha.getTimezoneOffset();
      return `${day}/${month}/${year}, 23:59:59 UTC+0`},
    continentToCode(continent){
      switch(continent){
        case "Mundo":
          return "world";
        case "Africa":
          return "002";
        case "Europa":
          return "150";
        case "America":
          return "019";
        case "Asia":
          return "142";
        case "Oceania":
          return "009";
        default:
          return undefined;
      }},
    continentByCountryCode(CountryCode){
      return this.continents[0].some(e => e == CountryCode) ? "africa" :
             this.continents[1].some(e => e == CountryCode) ? "europa" :
             this.continents[2].some(e => e == CountryCode) ? "america" :
             this.continents[3].some(e => e == CountryCode) ? "asia" : 
             this.continents[4].some(e => e == CountryCode) ? "oceania" : "sin_definir";},
    listadoFecha() {
      return this.listadoFechas.map(
        fecha =>
          new Object({
            fecha: fecha,
            diagnosticados: {total: 0, diario: 0},
            activos: {total: 0, diario: 0},
            recuperados: {total: 0, diario: 0},
            muertos: {total: 0, diario: 0},
          })
      );},
    codigoToContinente(codigo){
      switch(codigo){
        case "002":
          return this.continentes.africa;
        case "150":
          return this.continentes.europa;
        case "019":
          return this.continentes.america;
        case "142":
          return this.continentes.asia;
        case "009":
          return this.continentes.oceania;
        default:
           return undefined;
      }},
    codigoToPais(codigo) {
      return this.paises.find(p => p.codigo == codigo);},
    existePais(nombrePais) {
      return this.paises.findIndex(e => e.nombre == nombrePais) != -1 ? true : false;},
    indexFecha(p, fecha) {
      return p.historial.findIndex(e => e.fecha == fecha);},
    fechaToString(fecha) {
      if(fecha != undefined){
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        let año = fecha
          .getFullYear();
        return `${año}-${mes}-${dia}`;
      }else{
        return null;
      }},
    filtradoContinente(continente){
      return this.paises.filter(e => e.continente == continente);},
    regionContinente(dato){
      return this.geoChartOptions.region.length == 2 ? 
      this.codigoToPais(this.geoChartOptions.region).historial[this.indexFecha(this.paises[0], this.fecha)][dato] :
      this.geoChartOptions.region.length == 3 ?
      this.codigoToContinente(this.geoChartOptions.region).historial[this.indexFecha(this.paises[0],this.fecha)][dato] :
      this.geoChartOptions.region == "world" ?
      this.mundo.historial[this.indexFecha(this.paises[0],this.fecha)][dato] : null;}},
  filters: {
    numeroCorto(num){
      const SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
      var tier = Math.log10(num) / 3 | 0;
      if(tier == 0) return num;
      var suffix = SI_SYMBOL[tier];
      var scale = Math.pow(10, tier * 3);
      var scaled = num / scale;
      return scaled.toFixed(1) + suffix;},
    separacion(numero){
        return typeof numero === "number" ? numero.toLocaleString("ES") : 0
      },
    mayuscula(nombre) {
      return !nombre ? "" : nombre.toUpperCase();}},
  watch:{
    pantalla(valorAntiguo, valorNuevo){
      if(valorAntiguo != valorNuevo){
        this.modificarChart();
      }
     }},
  computed: {
    pantalla(){
        if(this.windowWidth < 576){
          return "XS";
        }else if(this.windowWidth >= 576 && this.windowWidth < 768){
          return "SM";
        }else if(this.windowWidth >= 768 && this.windowWidth < 992){
          return "MD";
        }else if(this.windowWidth >= 992 && this.windowWidth < 1200){
          return "LG";
        }else if(this.windowWidth >= 1200){
          return "XL";
        }else{
          return null;
        }
      },

    areaChartData(){
      let datos = [["sin fecha",0]];
      switch(this.areaChartOptions.tipoDatos){
          case "diagnosticados.diario":
            datos = this.regionSeleccionada.historial.filter(e => 
             new Date(e.fecha) <= new Date(this.fecha))
            .map(e => [new Date(e.fecha), e.diagnosticados.diario]);
            datos.unshift(["Dia", "Diagnosticados"]);
            this.cambiarColorArea("diagnosticados");
            return datos.sort((a,b) => new Date(a[0]) - new Date(b[0]));
          case "activos.diario":
            datos = this.regionSeleccionada.historial.filter(e => 
             new Date(e.fecha) <= new Date(this.fecha))
            .map(e => [new Date(e.fecha), e.activos.diario]);
            datos.unshift(["Dia", "Activos"]);
            this.cambiarColorArea("activos");
            return datos.sort((a,b) => new Date(a[0]) - new Date(b[0]));
          case "recuperados.diario":
            return datos;
          case "muertos.diario":
            datos = this.regionSeleccionada.historial.filter(e => 
            new Date(e.fecha) <= new Date(this.fecha))
            .map(e => [new Date(e.fecha), e.muertos.diario]);
            datos.unshift(["Dia", "Muertos"]);
            this.cambiarColorArea("muertos");
            return datos.sort((a,b) => new Date(a[0]) - new Date(b[0]));
          case "todos.total":
            datos = [["sin fecha",0,0,0]];
            datos = this.regionSeleccionada.historial.filter(e => 
            new Date(e.fecha) <= new Date(this.fecha))
            .map(e => [new Date(e.fecha), e.diagnosticados.total, e.activos.total,e.muertos.total]);
            datos.unshift(["Dia", "Diagnosticados","Activos", "Muertos"]);
            this.cambiarColorArea("todos");
            return datos.sort((a,b) => new Date(a[0]) - new Date(b[0]));
          default:
            return datos;
        }
      },
    geoChartData(){
      let datos;
      switch(this.geoChartOptions.tipoDatos){
        case "diagnosticados.total":
          datos = this.paises.filter(p => p.codigo != "XX").map(e => [e.nombre,e.historial[this.indexFecha(e, this.fecha)].diagnosticados.total]);
          datos.unshift(['Country', 'Diagnosticados']);
          break;
        case "activos.total":
          datos = this.paises.filter(p => p.codigo != "XX").map(e => [e.nombre,e.historial[this.indexFecha(e, this.fecha)].activos.total]);
          datos.unshift(['Country', 'Activos']);
          break;
        case "recuperados.total":
          break;
        case "muertos.total":
          datos = this.paises.filter(p => p.codigo != "XX").map(e => [e.nombre,e.historial[this.indexFecha(e, this.fecha)].muertos.total]);
          datos.unshift(['Country', 'Muertos']);
          break;
        default:
          break;
      }
      return datos;},
    pieChartData() {
        return [
          ["Tipo", "Cantidad"],
          ["Activos", this.consultarDatos("activos").total],
          ["Muertos", this.consultarDatos("muertos").total]
        ];
      },
    fecha() {
        return (new Date(this.calendarOptions.fechaSeleccionada - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0, -14) + "T00:00:00Z";
      },
    listadoFiltrado(){
          switch(this.filtros.listado){
            case "diagnosticados.total":
              return this.paises.slice().sort(
                (a, b) =>
                  b.historial[this.indexFecha(this.paises[0], this.fecha)].diagnosticados.total -
                  a.historial[this.indexFecha(this.paises[0], this.fecha)].diagnosticados.total);
            case "muertos.total":
              return this.paises.slice().sort(
                (a, b) =>
                  b.historial[this.indexFecha(this.paises[0], this.fecha)].muertos.total -
                  a.historial[this.indexFecha(this.paises[0], this.fecha)].muertos.total);
            case "activos.total":
              return this.paises.slice().sort(
                (a, b) =>
                  b.historial[this.indexFecha(this.paises[0], this.fecha)].activos.total -
                  a.historial[this.indexFecha(this.paises[0], this.fecha)].activos.total);
            default:
              return this.paises;
          }
        } 
      },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
    this.comprobarBackup();
    fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations?timelines=1")
    .then(res => this.respuestaOk(res))
    .then(resJSON => this.existeNuevaVersion(resJSON))
    .then(datos => {
      this.funcionesIniciales(datos);
      this.guardarBackup(datos);
    })
    .catch(error => this.cargarBackup(error));
    }
  }
</script>

