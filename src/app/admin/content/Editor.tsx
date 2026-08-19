'use client'

import { useState } from 'react'
import type { Field, SectionSchema } from '@/lib/content-schema'

type Row = Record<string, string>

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field
  value: string
  onChange: (v: string) => void
}) {
  const common = {
    id: undefined,
    value: value ?? '',
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      onChange(e.target.value),
  }

  return (
    <label className={`ed-field${field.wide ? ' is-wide' : ''}`}>
      <span className="ed-label">{field.label}</span>

      {field.type === 'textarea' ? (
        <textarea {...common} rows={3} placeholder={field.placeholder} />
      ) : field.type === 'select' ? (
        <select {...common}>
          {field.options?.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input {...common} placeholder={field.placeholder} />
      )}

      {field.help && <span className="ed-help">{field.help}</span>}
    </label>
  )
}

export default function Editor({
  schema,
  initial,
}: {
  schema: SectionSchema
  initial: Row[]
}) {
  const [rows, setRows] = useState<Row[]>(initial)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [error, setError] = useState('')

  const isList = schema.kind === 'list'
  const dirty = JSON.stringify(rows) !== JSON.stringify(initial)

  function update(index: number, name: string, value: string) {
    setRows(prev => prev.map((r, i) => (i === index ? { ...r, [name]: value } : r)))
    setStatus('idle')
  }

  function move(index: number, by: number) {
    const target = index + by
    if (target < 0 || target >= rows.length) return
    setRows(prev => {
      const next = [...prev]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
    setStatus('idle')
  }

  function remove(index: number) {
    setRows(prev => prev.filter((_, i) => i !== index))
    setStatus('idle')
  }

  function add() {
    setRows(prev => [...prev, { ...schema.blank }])
    setStatus('idle')
  }

  async function save() {
    setStatus('saving')
    setError('')
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section: schema.key, data: rows }),
      })
      if (!res.ok) throw new Error((await res.text()) || 'Save failed')
      setStatus('saved')
    } catch (e) {
      setStatus('error')
      setError(e instanceof Error ? e.message : 'Save failed')
    }
  }

  return (
    <>
      <div className="ed-bar">
        <span className="ed-count">
          {isList ? `${rows.length} ${schema.itemName}${rows.length === 1 ? '' : 's'}` : schema.title}
        </span>
        <div className="ed-bar-actions">
          {status === 'saved' && <span className="ed-ok">Saved. The site is updating.</span>}
          {status === 'error' && <span className="ed-bad">{error}</span>}
          {isList && (
            <button type="button" className="adm-btn" onClick={add}>
              + Add {schema.itemName}
            </button>
          )}
          <button
            type="button"
            className="adm-btn is-primary"
            onClick={save}
            disabled={status === 'saving' || !dirty}
          >
            {status === 'saving' ? 'Saving…' : dirty ? 'Save changes' : 'No changes'}
          </button>
        </div>
      </div>

      <div className="ed-rows">
        {rows.map((row, i) => (
          <details key={i} className="ed-row" open={!isList || !row[schema.titleField]}>
            <summary>
              <span className="ed-row-title">
                {row[schema.titleField] || `Untitled ${schema.itemName}`}
              </span>
              {isList && (
                <span className="ed-row-pos">
                  {i + 1}/{rows.length}
                </span>
              )}
            </summary>

            <div className="ed-row-body">
              <div className="ed-grid">
                {schema.fields.map(f => (
                  <FieldInput
                    key={f.name}
                    field={f}
                    value={row[f.name] ?? ''}
                    onChange={v => update(i, f.name, v)}
                  />
                ))}
              </div>

              {isList && (
                <div className="ed-row-actions">
                  <button type="button" className="adm-btn" onClick={() => move(i, -1)} disabled={i === 0}>
                    ↑ Up
                  </button>
                  <button
                    type="button"
                    className="adm-btn"
                    onClick={() => move(i, 1)}
                    disabled={i === rows.length - 1}
                  >
                    ↓ Down
                  </button>
                  <button type="button" className="adm-btn is-danger" onClick={() => remove(i)}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          </details>
        ))}
      </div>

      {isList && rows.length === 0 && (
        <div className="adm-panel adm-empty">
          <p>No {schema.itemName}s yet.</p>
        </div>
      )}
    </>
  )
}
