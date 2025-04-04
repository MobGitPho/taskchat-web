@php
use Creopse\Creopse\Models\AppInformation;

$appNameItem = AppInformation::where('key', 'name')->first();
$appName = $appNameItem ? $appNameItem->value : config('app.name');
@endphp
<x-mail::message>
# {{ $contentData['title'] }}

<p>
{{ $contentData['message'] }}
</p>

@lang('Regards'),<br>
{{ $appName }}
</x-mail::message>
