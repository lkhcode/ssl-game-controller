<script setup lang="ts">
import type {Vector2Json} from "@/proto/geom/ssl_gc_geometry_pb";

const props = defineProps<{
  modelValue?: Vector2Json,
  label?: string,
}>()

const emit = defineEmits<(event: 'update:modelValue', payload: Vector2Json | undefined) => void>();

const updateValue = (v: Vector2Json | undefined) => {
  emit('update:modelValue', v)
}
const updateX = (x: string | number | null) => {
  if (x !== null) {
    const y = props.modelValue?.y || 0
    if (typeof x === 'string') {
      updateValue({x: parseFloat(x), y})
    } else {
      updateValue({x, y})
    }
  } else {
    updateValue(undefined)
  }
}
const updateY = (y: string | number | null) => {
  if (y !== null) {
    const x = props.modelValue?.x || 0
    if (typeof y === 'string') {
      updateValue({x, y: parseFloat(y)})
    } else {
      updateValue({x, y})
    }
  } else {
    updateValue(undefined)
  }
}

</script>

<template>
  <q-item>
    <q-item-section>
      <q-input
        input-class="text-center"
        dense
        type="number"
        :label="(label || '坐标') + ' x (m)'"
        :model-value="modelValue?.x"
        @update:model-value="updateX"
      >
        <template v-slot:prepend>
          <q-icon name="close" @click="updateX(null)"/>
        </template>
      </q-input>
    </q-item-section>
    <q-item-section>
      <q-input
        input-class="text-center"
        dense
        type="number"
        :label="(label || '坐标') + ' y (m)'"
        :model-value="modelValue?.y"
        @update:model-value="updateY"
      >
        <template v-slot:prepend>
          <q-icon name="close" @click="updateY(null)"/>
        </template>
      </q-input>
    </q-item-section>
  </q-item>
</template>
